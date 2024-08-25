import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, take, debounceTime, first } from 'rxjs/operators';

import { forkJoin } from 'rxjs';
import { arrayUnion } from 'firebase/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CurBaseService {
  public link = '';
  public cargoparametrosb = false;
  docId: string = '';

  constructor(public db: AngularFirestore,
    private http: HttpClient) {
    console.log('constructor servico CurBaseService', this.link);
  }



  //Se suscribe a Coleccion recibe link de fb retorna suscripcion a toda la coleccion
  public getCollectionFB(plink: string) {
    return this.db
      .collection(plink)
      .valueChanges();
  }
  public getCollectionWhereFB(plink: string, pnomcampofil: string, pvalcampofil: string) {
    console.log('plink,pnomcampofil,pvalcampofil', plink, pnomcampofil, pvalcampofil)
    return this.db
      .collection(plink, ref => ref.where(pnomcampofil, '==', pvalcampofil))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map((a: any) => {
            let data = a.payload.doc.data();
            const id = a.payload.doc.id;
            data.id_reg = id;
            return data;
          })
        )
      );
  }

  //Se suscribe a Coleccion recibe link de fb retorna suscripcion a toda la coleccion y trae los ids
  public getCollectionFBIds(plink: string) {
    console.log('en getCollectionFB');
    return this.db
      .collection(plink)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map((a: any) => {
            let data = a.payload.doc.data();
            const id = a.payload.doc.id;
            data.id_reg = id;
            return data;
          })
        )
      );
  }

  // Subscripcion a colleccion con ids, limitando el numero de registros que trae
  public getCollectionIdFBLimited(plink: string, limit: number) {
    return this.db
      .collection(plink, ref => ref.limit(limit))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map((a: any) => {
            var data = a.payload.doc.data();
            const id = a.payload.doc.id;
            data.id_reg = id;
            return data;
          })
        )
      );
  }

  // get collection con paginacion en firebase
  public getColLim(plink: string, filters: any, orders: any, lim: number, doc?: string, direction?: string) {
    console.log(orders)
    return this.db.collection(plink, ref => {
      let query: firebase.default.firestore.CollectionReference | firebase.default.firestore.Query = ref;
      filters.forEach((filter: any) => {
        query = query.where(filter.name, filter.comparator, filter.value);
      });
      orders.forEach((order: any) => {
        query = query.orderBy(order.field, order.dir);
      });
      query = query.limit(lim)
      if (doc) {
        query = direction ? query.startAfter(doc) : query.startAt(doc)
      }
      return query;
    }).snapshotChanges()
  }


  public getRefOnce(ref: any) {
    let r = this.db.collection("d").doc("d");
    r.ref = ref;
    return r.valueChanges().pipe(first()).toPromise();
  }
  public getRefOnceId(ref: any) {
    console.log(ref)
    let r = this.db.collection("d").doc("d");
    r.ref = ref;
    return r.snapshotChanges().pipe(first()).toPromise();
  }

  public genRef(plink: string, id: string) {
    let ref = this.db.collection(plink).doc(id);
    return ref.ref;
  }


  //Se suscribe a Coleccion recibe link y filtro de un campo de fb retorna suscripcion a toda la coleccion
  //adiciona el id y los datos los deja en data
  public getCollectionIdWhereFB(plink: string, pnomcampofil: string, pvalcampofil: any, sign: any) {
    console.log(plink)
    return this.db
      .collection(plink, ref => ref.where(pnomcampofil, sign, pvalcampofil))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map((a: any) => {
            // console.log(a);
            var data = a.payload.doc.data();
            const id = a.payload.doc.id;
            // console.log(id,data);
            data.id_reg = id;
            return data;
          })
        )
      );
  }

  //Adiciona registro o documento a colección con id recibido
  public addDocConIdFb(idt: string, plink: string, objdatos: any) {
    console.log('addDocConIdFb ', plink, idt, objdatos);
    return this.db.collection(plink).doc(idt).set(objdatos);
  }
  //Adiciona registro o documento a colección din id, genera el id
  public addDocSinIdFb(plink: string, objdatos: any) {
    console.log('addDocSinIdFb ', objdatos);
    this.db.collection(plink).add(objdatos);
  }
  //Actualiza documento coleccion
  public actDocFb(idt: string, plink: string, objdatos: any) {
    console.log('actDocFb ', idt, plink, objdatos);
    return this.db.collection(plink).doc(idt).update(objdatos);
  }
  //Actualiza documento coleccion
  public actArrayDocFb(idt: string, plink: string, objdatos: any, key: string) {
    const obj: any = {}
    obj[key] = arrayUnion(objdatos)
    console.log('actDocFb ', idt, plink, objdatos);
    this.db.collection(plink).doc(idt).update(obj
    );
  }

  //genera un id automatico de firebase
  public genId() {
    return this.db.createId()
  }
  //Borra documento de una coleccion
  public deleteDocFb(plink: string, idt: string) {
    this.db.collection(plink).doc(idt).delete();
  }

  public getDocumentById(plink: string, idt: string) {

    return this.db.collection(plink).doc(idt).valueChanges();
  }
  public getDocOnce(plink: string, id: string) {
    let ref = this.db.collection(plink).doc(id);
    return ref.valueChanges().pipe(first()).toPromise();
  }


  //Consulta una colección con un campo y valor de campo a filtrar retorna suscribción a esta
  //usado para retornar registros con filtro por un campo
  public consultaCollectionWhereFb(plink: string, pnomcampo: string, pvalorcampo: string, sign: any) {
    console.log(plink, pnomcampo, pvalorcampo, sign)
    return this.db.collection(plink, ref => ref.where(pnomcampo, sign, pvalorcampo))
      .valueChanges();
  }
  //Consulta una colección con un campo y valor de campo a filtrar retorna suscribción a esta
  //usado para validadores, con limitacion de numero de registros que trae
  public consultaCollectionWhereFbLimited(plink: string, pnomcampo: string, pvalorcampo: string, sign: any, limit: any) {

    return this.db.collection(plink, ref => ref.where(pnomcampo, sign, pvalorcampo).limit(limit))
      .valueChanges().pipe(
        map(arr => {
          return arr;
        }),
      )
  }



  //Consulta una colección con dos o mas campos y valores de campo como una condicion or retorna promesa
  //con los dos resultados, usado para validacion

  public consultaCollectionWhereManyFb(arrayConsultas: Array<any>) {
    console.log(arrayConsultas);
    const observables: any = [];
    arrayConsultas.forEach(obj => {
      const link = obj.link;
      const pnomcampo = obj.pnomcampo;
      const pvalorcampo = obj.pvalorcampo;
      const query = this.db.collection(link, ref => ref.where(pnomcampo, '==', pvalorcampo))
        .valueChanges().pipe(first());
      observables.push(query);
    });
    console.log('observables', observables)

    const joint = forkJoin(observables);
    return joint;

  }


  //FUNCIONES PROYECTO DE ACTIVOS ACOPLE
  public async deleteDocFbAsync(plink: string, idt: string) {
    // console.log('deleteDocFb ', plink,idt);
    return this.db.collection(plink).doc(idt).delete();
  }
  public addDocSinIdFbBringRef(objdatos: string, plink: string) {
    console.log('addDocSinIdFb ', objdatos);
    return new Promise((resolve, reject) => {
      this.db.collection(plink).add(objdatos).then(docRef => {
        this.docId = docRef.id;
        console.log('id del documento', docRef.id) // docRef of type void | DocumentReference
        resolve(docRef.id);
      });
    });
  }
  public async getOneDocument(plink: string) {
    return this.db.collection(plink, ref => ref.limit(1)).get().toPromise();
  }

  convertirMinuscula(obj: any, campos: string[]) {
    campos.forEach(campo => {
      obj[campo] = obj[campo].toLowerCase()
    });
    return obj;
  }

  //Consulta una colección con dos campos y valores de campo como una condicion or retorna promesa
  //con los dos resultados, usado para validacion
  public consultaCollectionWhereDosCamposOrFb(plink: string, pnomcampo1: string, pvalorcampo1: any, pnomcampo2: string, pvalorcampo2: any) {
    const q1 = this.db.collection(plink, ref => ref.where(pnomcampo1, '==', pvalorcampo1))
      .valueChanges().pipe(first());
    const q2 = this.db.collection(plink, ref => ref.where(pnomcampo2, '==', pvalorcampo2))
      .valueChanges().pipe(first());
    const observables = [q1, q2];
    const joint = forkJoin(observables);
    return joint;
  }

  //Consulta una colección con un campo y valor de campo a filtrar retorna suscribción a esta
  //retorna un registro usado para validación si existe ya
  public consultaCollectionWhereValidateFb(plink: string, pnomcampo: string, pvalorcampo: any) {
    console.log('consultaCollectionWhereValidateFb ', plink, pnomcampo, pvalorcampo);
    // return this.db.collection(plink, ref => ref.where('id_tipo', '==', pvalorcampo) )
    return this.db.collection(plink, ref => ref.where(pnomcampo, '==', pvalorcampo))
      .valueChanges().pipe(
        debounceTime(500),
        take(1),
        map(arr => {
          return arr;
        }),
      )

  }

  public getCollectionIdFBStartLimited(plink: string, pnomcam: string, pvalcam: any, plimit: number) {
    return this.db
      .collection(plink, ref => ref.where(pnomcam, '>=', pvalcam).where(pnomcam, '<=', pvalcam + '\uf8ff')
        .limit(plimit))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map((a: any) => {
            var data = a.payload.doc.data();
            const id = a.payload.doc.id;
            data.id_reg = id;
            return data;
          })
        )
      );
  }

  //-----------------------------------------------

  //Registra log de cur de coleccion dada recibe pidref para identificar el registro y posteriormente poder filtrar por este
  public regLogFb(plink: string, datos: any, pidref: any, accion: string, seguimiento: string) {
    const now = new Date();
    const dia = now.getDate();
    const mes = now.getMonth() + 1;
    const ano = now.getFullYear();
    const hora = now.getHours();
    const minutos = now.getMinutes();
    const segundos = now.getSeconds();
    const numaleator = Math.round(Math.random() * (1000 - 1999) + 1000);
    const idlog = ano.toString() + mes.toString() + dia.toString() + hora.toString() + minutos.toString() + segundos.toString() + numaleator.toString();
    const reglog = {
      id: idlog,
      // usuario: this.global.user.primerNombre + ' ' + this.global.user.primerApellido,
      fecha: now,
      id_ref: pidref,
      datos: datos,
      accion: accion,
      seguimiento: seguimiento
    }
    console.log('save fb ', reglog);
    this.db.collection(plink)
      .doc(idlog).set(reglog);
  }

  //Retorna el log de una colección dada con el id referenciado
  public getLogFB(plink: string, pnomcampoidref: string, pidref: string) {
    console.log('getLogFB', plink, pidref);
    return this.db
      .collection(plink,
        ref => ref.where(pnomcampoidref, '==', pidref))
      // ref => ref.where('id_ref', '==', pidref))
      .valueChanges()
      .pipe(
        map(actions =>
          actions.map((a: any) => {
            const fecha = a.fecha.toDate();
            const fechastr = fecha.toLocaleDateString()
            const horastr = fecha.toLocaleTimeString()
            const fechalog = a.fecha.toDate();
            return { fechalog, fechastr, horastr, ...a };
          })
        )
      );
  }
  //Retorna el log de una colección dada sin condición todo
  public getLogsinCondiFB(plink: string) {
    console.log('getLogFB', plink);
    return this.db
      .collection(plink)
      .valueChanges()
      .pipe(
        map(actions =>
          actions.map((a: any) => {
            const fecha = a.fecha.toDate();
            const fechastr = fecha.toLocaleDateString()
            const horastr = fecha.toLocaleTimeString()
            const fechalog = a.fecha.toDate();
            return { fechalog, fechastr, horastr, ...a };
          })
        )
      );
  }


  public getGroupQuery(groupname: string, pnomcampo: string, pvalcampo: any) {
    return this.db.collectionGroup(groupname, ref => ref.where(pnomcampo, '==', pvalcampo)
      //  .orderBy(porderby, 'desc')
    ).valueChanges();
  }

  //Manejo de transacciones

  public addDocsBatch(plink: string, objdatos: any, llave: string) {
    var batch = this.db.firestore.batch();
    for (let dato of objdatos) {
      var ref = this.db.firestore.collection(plink).doc(dato[llave].toString());
      batch.set(ref, { ...dato });
    }
    batch.commit().then(() => {
      console.log("Lote terminado correctamente");
    });
  }


}

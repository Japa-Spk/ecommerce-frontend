import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { map } from "rxjs/operators";

type Archivo = {
  url: string;
  nombre: string;
  tipo: string;
};
@Injectable({
  providedIn: "root",
})
export class ArchivosFBService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  //Traer todos los registros de archivos guardados
  public getArchivos(idmod: string, mod: string, regEspecif: boolean, idRegEspecif: string) {
    if (!regEspecif) {
      return this.db
        .collection<any>("archivosadj", (ref) =>
          ref.where("id_modasocia", "==", idmod).where("mod_asocia", "==", mod)
        )
        .snapshotChanges()
        .pipe(
          map((actions) => {
            return actions.map((a) => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              console.log("Return getCategories");
              return { id, ...data };
            });
          })
        );
    }
    if (regEspecif) {
      return this.db
        .collection<any>("archivosadj", (ref) =>
          ref
            .where("id_modasocia", "==", idmod)
            .where("mod_asocia", "==", mod)
            .where("id_regespecif", "==", idRegEspecif)
        )
        .snapshotChanges()
        .pipe(
          map((actions) => {
            return actions.map((a) => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              console.log("Return getCategories");
              return { id, ...data };
            });
          })
        );
    }
    return;
  }
  //Traer solo un registro de archivos guardados
  public getArchivo(id: string) {
    return this.db.collection("archivosadj").doc(id).snapshotChanges();
  }
  //Guardar registro de archivo guardado en storage
  public setArchivo(archivo: any) {
    return new Promise((resolve, reject) => {
      this.db
        .collection("archivosadj")
        .doc(archivo.id)
        .set(archivo)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
  //ELiminar registro de archivos guardados
  public deleteArchivo(id: string) {
    return this.db.collection("archivosadj").doc(id).delete();
  }

  //Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload("archivosadj/" + nombreArchivo, datos);
  }

  //Tarea para subir archivo
  public tareaCloudStorageCustom(link: string, nombreArchivo: string, datos: any) {
    return this.storage.upload(link + nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }


  public grabarImagenes(imagenes: any, urlcloud: string) {
    console.log('a grabar imagenes', imagenes);
    return new Promise((resolve, reject) => {
      var countimg = 0;
      if (imagenes.length > 0) {
        var arraycompare = []
        for (var i of imagenes) {
          console.log('a grabar imagen ->', i);
          var arrayurls: Archivo[] = [];
          let archivo = i;
          let archivoname = new Date().getTime() + '_' + archivo.name;
          let referencia = this.referenciaCloudStorage(urlcloud + archivoname);
          let tarea = this.tareaCloudStorageCustom(urlcloud, archivoname, archivo);
          arraycompare.push(archivoname);
          //Cambia el porcentaje
          tarea.percentageChanges().subscribe(async (porcentaje: number | undefined) => {
            var porcentaje: number | undefined = typeof porcentaje == 'number' ? Math.round(porcentaje) : undefined;
            console.log('porcentaje', porcentaje);
          }, err => { }, async () => { //Correccion de evaluar si el percentaje es 100 se quito y se uso la funcion de completado de la tarea, arreglo la duplicacion.
            console.log('completado');
            await new Promise(resolve => setTimeout(() => resolve(true), 1000));
            // si Archivo sube al storage
            referencia.getDownloadURL().subscribe((URL) => {
              //Llama URL por referencia
              var URLPublica = URL;
              //Inicializacion de dimensiones
              var img426 = "";
              var img640 = "";
              var img1280 = "";
              if (URLPublica.indexOf('.png') > 0) {
                img426 = URLPublica.replace(".png", "_426x240.png");
                img640 = URLPublica.replace(".png", "_640x360.png");
                img1280 = URLPublica.replace(".png", "_1280x720.png");
              } if (URLPublica.indexOf('.jpg') > 0) {
                img426 = URLPublica.replace(".jpg", "_426x240.jpg");
                img640 = URLPublica.replace(".jpg", "_640x360.jpg");
                img1280 = URLPublica.replace(".jpg", "_1280x720.jpg");
              } if (URLPublica.indexOf('.jpeg') > 0) {
                img426 = URLPublica.replace(".jpeg", "_426x240.jpeg");
                img640 = URLPublica.replace(".jpeg", "_640x360.jpeg");
                img1280 = URLPublica.replace(".jpeg", "_1280x720.jpeg");
              } if (URLPublica.indexOf('.webp') > 0) {
                img426 = URLPublica.replace(".webp", "_426x240.webp");
                img640 = URLPublica.replace(".webp", "_640x360.webp");
                img1280 = URLPublica.replace(".webp", "_1280x720.webp");
              }
              //Armado de archivo
              var archivotemp = { url: URLPublica, url_240: img426, url_360: img640, url_720: img1280, nombre: archivoname, tipo: archivo.type, path: urlcloud };
              arrayurls.push(archivotemp);
              countimg++;
              console.log('URLPublica', URLPublica, countimg, imagenes.length, archivo);
              if (countimg == imagenes.length) {
                console.log('arrayurls complete', arrayurls);
                if (arrayurls.length != arraycompare.length) { //Verifica que no haya subido imagenes repetidas
                  console.log('Encontro imagenes repetidas', arrayurls, arrayurls);
                  const setObj = new Set(); // creamos pares de clave y array
                  const unicos = arrayurls.reduce((acc: any, urls) => {
                    if (!setObj.has(urls.nombre)) {
                      setObj.add(urls.nombre)
                      acc.push(urls)
                    }
                    return acc;
                  }, []);
                  arrayurls = unicos;
                  resolve([...arrayurls]);
                } else {
                  resolve([...arrayurls]);
                }
              }
            });
          });

        }
      }
    });
  }

  public grabarArchivos(archivos: any, urlcloud: string) {
    console.log('a grabar imagenes', archivos);
    return new Promise((resolve, reject) => {
      var countimg = 0;
      if (archivos.length > 0) {
        for (var i of archivos) {
          console.log('a grabar archivos ->', i);
          var arrayurls: Archivo[] = [];
          let archivo = i;
          //Ajuste de nombre de archivo para evitar la corrupcion de los que tengan el mismo nombre en la mismacarpeta.
          let archivoname = new Date().getTime() + '_' + archivo.name;
          let referencia = this.referenciaCloudStorage(urlcloud + archivoname);
          let tarea = this.tareaCloudStorageCustom(urlcloud, archivoname, archivo);
          //Cambia el porcentaje
          tarea.percentageChanges().subscribe(async (porcentaje: number | undefined) => {
            var porcentaje: number | undefined = typeof porcentaje == 'number' ? Math.round(porcentaje) : undefined;
            console.log('porcentaje', porcentaje);
            if (porcentaje == 100) {
              // si Archivo sube al storage
              await new Promise(resolve => setTimeout(() => resolve(true), 1000));
              referencia.getDownloadURL().subscribe((URL) => {
                //Llama URL por referencia
                var URLPublica = URL;
                //Armado de archivo
                var archivotemp = { url: URLPublica, nombre: archivoname, tipo: archivo.type, path: urlcloud };
                arrayurls.push(archivotemp);
                countimg++;
                console.log('URLPublica', URLPublica, countimg, archivos.length);
                if (countimg == archivos.length) {
                  console.log('arrayurls complete', arrayurls);
                  resolve(arrayurls);
                }
              });
            }
          });
        }
      }
    });
  }

  eliminarArchivoCloud(urlcloud: string, nombreArchivo: string) {
    let referencia = this.referenciaCloudStorage(urlcloud + nombreArchivo);
    return new Promise((resolve, reject) => {
      referencia.delete().subscribe(res => {
        console.log('eliminado', res);
        resolve(true);
      }, err => {
        console.log('error', err);
        resolve(true);//si no se elimina, se considera eliminado
      });
    });
  }



}

import { AbstractControl, ValidatorFn } from '@angular/forms';

// Validador personalizado que compara dos controles
export function matchValuesValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
        const control = formGroup.get(controlName);
        const matchingControl = formGroup.get(matchingControlName);

        if (!control || !matchingControl) {
            return null;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ matchValues: true });
            return { matchValues: true };
        } else {
            matchingControl.setErrors(null);
            return null;
        }
    };
}

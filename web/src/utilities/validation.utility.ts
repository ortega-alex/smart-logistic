/**
 * Allows to validate if a text string is a valid dpi
 * @param {String} no_dpi
 * @returns {String}
 */
export const noDpiIsValid = (no_dpi: string): string | null => {
    if (!no_dpi || String(no_dpi).trim() === '') return 'CUI vacío';
    const cuiRegExp = /^[0-9]{4}\s?[0-9]{5}\s?[0-9]{4}$/;

    if (!cuiRegExp.test(no_dpi)) return 'CUI con formato inválido';

    no_dpi = String(no_dpi).replace(/\s/, '').replace(/ /g, '');
    const depto = parseInt(no_dpi.substring(9, 11), 10);
    const muni = parseInt(no_dpi.substring(11, 13));
    const numero = no_dpi.substring(0, 8);
    const verificador = parseInt(no_dpi.substring(8, 9));

    // Se asume que la codificación de Municipios y
    // departamentos es la misma que esta publicada en
    // http://goo.gl/EsxN1a

    // Listado de municipios actualizado segun:
    // http://goo.gl/QLNglm

    // Este listado contiene la cantidad de municipios
    // existentes en cada departamento para poder
    // determinar el código máximo aceptado por cada
    // uno de los departamentos.
    const munisPorDepto = [
        /* 01 - Guatemala tiene:      */ 17 /* municipios. */, /* 02 - El Progreso tiene:    */ 8 /* municipios. */,
        /* 03 - Sacatepéquez tiene:   */ 16 /* municipios. */, /* 04 - Chimaltenango tiene:  */ 16 /* municipios. */,
        /* 05 - Escuintla tiene:      */ 13 /* municipios. */, /* 06 - Santa Rosa tiene:     */ 14 /* municipios. */,
        /* 07 - Sololá tiene:         */ 19 /* municipios. */, /* 08 - Totonicapán tiene:    */ 8 /* municipios. */,
        /* 09 - Quetzaltenango tiene: */ 24 /* municipios. */, /* 10 - Suchitepéquez tiene:  */ 21 /* municipios. */,
        /* 11 - Retalhuleu tiene:     */ 9 /* municipios. */, /* 12 - San Marcos tiene:     */ 30 /* municipios. */,
        /* 13 - Huehuetenango tiene:  */ 32 /* municipios. */, /* 14 - Quiché tiene:         */ 21 /* municipios. */,
        /* 15 - Baja Verapaz tiene:   */ 8 /* municipios. */, /* 16 - Alta Verapaz tiene:   */ 17 /* municipios. */,
        /* 17 - Petén tiene:          */ 14 /* municipios. */, /* 18 - Izabal tiene:         */ 5 /* municipios. */,
        /* 19 - Zacapa tiene:         */ 11 /* municipios. */, /* 20 - Chiquimula tiene:     */ 11 /* municipios. */,
        /* 21 - Jalapa tiene:         */ 7 /* municipios. */, /* 22 - Jutiapa tiene:        */ 17 /* municipios. */
    ];

    if (depto === 0 || muni === 0) return 'CUI con código de municipio o departamento inválido.';
    if (depto > munisPorDepto.length) return 'CUI con código de departamento inválido.';
    if (muni > munisPorDepto[depto - 1]) return 'CUI con código de municipio inválido.';

    // Se verifica el correlativo con base
    // en el algoritmo del complemento 11.
    let total = 0;
    for (let i = 0; i < numero.length; i++) {
        total += Number(numero[i]) * (i + 2);
    }

    const modulo = total % 11;
    return !(modulo === verificador) ? 'No valido' : null;
};

/**
 * Allows to validate if a number is a valid nit number
 * @param {Number} no_nit
 * @returns {String}
 */
export const nitIsValid = (no_nit: string): string | null => {
    if (no_nit.toUpperCase() === 'CF') return null;

    if (!no_nit || String(no_nit).trim() === '') return 'NIT vacío';

    const nitRegExp = /^[0-9]+(-?[0-9kK])?$/;
    if (!nitRegExp.test(no_nit)) return 'Nit con formato invalido';

    no_nit = String(no_nit).replace(/-/, '');
    const lastChar = no_nit.length - 1;
    const number = no_nit.substring(0, lastChar);
    const expectedCheker = no_nit.substring(lastChar, lastChar + 1).toLowerCase();

    let factor = number.length + 1;
    let total = 0;

    for (let i = 0; i < number.length; i++) {
        const character = number.substring(i, i + 1);
        const digit = parseInt(character, 10);
        total += digit * factor;
        factor = factor - 1;
    }

    const modulus = (11 - (total % 11)) % 11;
    const computedChecker = modulus === 10 ? 'k' : modulus.toString();

    if (/\s/.test(no_nit) || no_nit.includes('-')) return 'No se aceptan espacios ni guiones.';
    return expectedCheker === computedChecker ? null : 'NIT Inválido.';
};

/**
 * Allows you to check if a text string is a valid email
 * @param {String} mail
 * @returns {String}
 */
export const mailIsValied = (mail: string): string | null => {
    if (!mail || String(mail).trim() === '') return 'Correo vacío';
    const emailRegExp = /^(([^<>()[\],;:\s@"]+(\.[^<>()[\],;:\s@"]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,})$/;
    if (!emailRegExp.test(mail.trim())) return 'Correo no valido.';
    return null;
};

/**
 * Allows you to validate a password, which meets certain security criteria, or compare two passwords
 * @param {String} password
 * @param {String} currentPass
 * @returns {String}
 */
export const passwordIsValid = (password: string, currentPass?: string): string | null => {
    if (!password || String(password).trim() === '') return 'Contraseña vacío';
    const passRegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/g;
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    if (password.trim() === '') return 'La contraseña no puede estar vacía';
    if (currentPass && password === currentPass) return 'La nueva contraseña no puede ser igual a la actual';
    if (!passRegExp.test(password)) return 'La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número';
    return null;
};

/**
 * Allows you to validate that a phone number meets certain criteria
 * @param {String} number
 * @returns {String}
 */
export const phoneNumberIsValid = (number: string): string | null => {
    if (!number || String(number).trim() === '') return 'Número de teléfono vacio';
    const phoneNumberRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{2,6}$/im;
    if (!phoneNumberRegExp.test(number)) return 'Número de teléfono no es valido';
    return null;
};

/**
 * Allows you to validate that it only contains numbers
 * @param {String | Number} number
 * @returns
 */
export const onlyNumbers = (number: string | number): string | null => {
    if (!number || String(number).trim() === '') return 'Campo vacio';
    const onlyNumbersRegExp = /^[\d,.]+$/;
    if (!onlyNumbersRegExp.test(String(number))) return 'Ingrese unicamente cifras numericas';
    return null;
};

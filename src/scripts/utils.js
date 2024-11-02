/**
 * Verifica se o tipo de um valor corresponde ao tipo de um exemplo fornecido.
 *
 * @param {*} value - O valor a ser verificado.
 * @param {*} exampleOfType - O exemplo de tipo que será usado como referência.
 * @param {boolean} [throwErrors=false] - Se true, lança um erro ao invés de retornar false para tipos não correspondentes.
 * 
 * @returns {boolean} - Retorna true se os tipos são correspondentes, false caso contrário. 
 *                      Se ambos os valores forem null, retorna true. 
 *                      Lança um TypeError se throwErrors for true e os tipos não corresponderem.
 *
 * @throws {TypeError} - Lançado se throwErrors for true e os tipos não corresponderem, ou se um dos valores for null e o outro não.
 *
 * @example
 * typeVerification(null, null); // true
 * typeVerification(null, {}); // false
 * typeVerification(1, "1", true); // Lança TypeError
 * typeVerification(1, 2); // false
 */
export function typeVerification(value, exampleOfType, throwErrors = false) {
    const msg_pattern = "O argumento deve ser do mesmo tipo que o exemplo fornecido";
    // Se ambos são null, é válido
    if (value === null && exampleOfType === null) {
        return true;
    }
    // Se um é null e o outro não, retorna false
    else if (value === null || exampleOfType === null) {
        if(throwErrors){
            throw new TypeError(
                msg_pattern + "."
            );
        }
        return false;
    }

    // Se os tipos são diferentes, retorna false
    if (typeof value !== typeof exampleOfType) {
        if (throwErrors) {
            throw new TypeError(
                msg_pattern + `: ${typeof exampleOfType}.`
            );
        }
        return false;
    }

    return true; // Ambos são válidos e do mesmo tipo
}

/**
 * Capitaliza a primeira letra de cada palavra em uma string.
 *
 * Nota: Esta função depende da função `typeVerification` para validar o tipo de entrada.
 *
 * @param {string} string - A string a ser capitalizada. 
 *                          Se a string não for válida ou estiver vazia, retorna uma string vazia.
 * 
 * @returns {string} - Retorna a string com a primeira letra de cada palavra em maiúscula,
 *                    e as demais letras em minúscula. Se a string de entrada não for válida, retorna uma string vazia.
 *
 * @example
 * capitalize("era uma vez"); // "Era Uma Vez"
 * capitalize("CÃO DO MUNDO"); // "Cão Do Mundo"
 * capitalize(""); // ""
 * capitalize(null); // ""
 */
export function capitalize(string) {
    if (!string || !typeVerification(string, "string")) return "";
    return string
        .split(" ")
        .map((part) => {
            return part[0].toUpperCase() + part.slice(1).toLowerCase();
        })
        .join(" ");
}
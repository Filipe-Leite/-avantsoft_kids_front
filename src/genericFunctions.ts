export function convertKeysToCamelCase(obj: any): any {
  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      return obj.map(item => convertKeysToCamelCase(item));
    } else if (obj.constructor === Object) {
      const newObj: { [key: string]: any } = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
            letter.toUpperCase()
          );
          newObj[camelCaseKey] = convertKeysToCamelCase(obj[key]);
        }
      }
      return newObj;
    }
  }
  return obj;
}

interface Author {
  firstName: string;
  lastName: string;
  middleNames?: string[];
}

const LOWER_CASE_WORDS = new Set([
  'de', 'da', 'do', 'das', 'dos',
  'von', 'van', 'der', 'den', 'ten',
  'di', 'della', 'del', 'delle',
  'e', 'y', 'and',
  'la', 'le', 'les', 'el', 'los', 'las',
  'of', 'the'
]);

const SPECIAL_CHARACTERS = /['`´’"()\[\]]/;

export class AuthorReferenceFormatter {
  
  static formatAuthorReference(fullName: string): string {
    const trimmedName = fullName.trim();
    
    const nameParts = trimmedName.split(/\s+/);
    
    if (nameParts.length < 2) {
      return trimmedName.toUpperCase();
    }
    
    let lastNameIndex = nameParts.length - 1;
    

    if (nameParts.length > 2 && 
        LOWER_CASE_WORDS.has(nameParts[lastNameIndex].toLowerCase())) {
      lastNameIndex--;
    }
    
    const lastName = nameParts.slice(lastNameIndex).join(' ');
    const firstName = nameParts.slice(0, lastNameIndex).join(' ');
    
    const formattedLastName = this.formatLastName(lastName);
    const formattedFirstName = this.formatFirstName(firstName);
    
    return `${formattedLastName}, ${formattedFirstName}`;
  }

  private static formatLastName(lastName: string): string {
    return lastName.split(/\s+/)
      .map(word => {
        // Verifica se tem caractere especial no início
        if (SPECIAL_CHARACTERS.test(word.charAt(0))) {
          const firstChar = word.charAt(0);
          const rest = word.slice(1);
          return firstChar + this.capitalizeNamePart(rest);
        }
        return this.capitalizeNamePart(word);
      })
      .join(' ')
      .toUpperCase();
  }
  

  private static formatFirstName(firstName: string): string {
    if (!firstName) return '';
    
    return firstName.split(/\s+/)
      .map(word => {
        const lowerWord = word.toLowerCase();
        
        if (LOWER_CASE_WORDS.has(lowerWord)) {
          return lowerWord;
        }
        
        if (SPECIAL_CHARACTERS.test(word.charAt(0))) {
          const firstChar = word.charAt(0);
          const rest = word.slice(1).toLowerCase();
          return firstChar + this.capitalizeNamePart(rest);
        }
        
        return this.capitalizeNamePart(word);
      })
      .join(' ');
  }
  
  private static capitalizeNamePart(namePart: string): string {
    if (!namePart) return '';
    
    const lowerPart = namePart.toLowerCase();
    
    if (lowerPart.includes("'") || lowerPart.includes("`") || lowerPart.includes("´")) {
      return lowerPart.replace(/(^|['`´])([a-z])/g, match => match.toUpperCase());
    }
    
    if (lowerPart.includes('-')) {
      return lowerPart
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('-');
    }
    
    return lowerPart.charAt(0).toUpperCase() + lowerPart.slice(1);
  }
  
  static formatMultipleAuthors(authorsString: string): string {
    const authors = authorsString.split(/[;]/).map(a => a.trim());
    
    return authors
      .map(author => this.formatAuthorReference(author))
      .join('; ');
  }
}

// Exemplos de uso:
console.log(AuthorReferenceFormatter.formatAuthorReference("Machado de Assis"));
// ASSIS, Machado de

console.log(AuthorReferenceFormatter.formatAuthorReference("Clarice Lispector"));
// LISPECTOR, Clarice

console.log(AuthorReferenceFormatter.formatAuthorReference("João da Silva"));
// SILVA, João da

console.log(AuthorReferenceFormatter.formatAuthorReference("Maria do Carmo Albuquerque"));
// ALBUQUERQUE, Maria do Carmo

console.log(AuthorReferenceFormatter.formatAuthorReference("Oscar D'Ambrosio"));
// D'AMBROSIO, Oscar

console.log(AuthorReferenceFormatter.formatAuthorReference("Vincent van Gogh"));
// VAN GOGH, Vincent

console.log(AuthorReferenceFormatter.formatAuthorReference("Luís de Camões"));
// CAMÕES, Luís de

console.log(AuthorReferenceFormatter.formatMultipleAuthors(
  "Machado de Assis; Clarice Lispector; João da Silva"
));
// ASSIS, Machado de; LISPECTOR, Clarice; SILVA, João da
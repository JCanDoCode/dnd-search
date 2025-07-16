// DND API SEARCH CONTROLLER
// v1.2.0

const results = document.querySelector('#results');
const resultsNav = document.querySelector('#resultsNav')
let entry = 0;

class RequestText {
   constructor(text) {
      const container = document.getElementById(entry);
      const desc = document.createElement('p');
      desc.textContent = text;
      container.appendChild(desc);
   }
}
class RequestTextStrong {
   constructor(text) {
      const container = document.getElementById(entry);
      const h3 = document.createElement('h3');
      h3.textContent = text;
      container.appendChild(h3);
   }
}

async function request(e, input) {
   e.preventDefault(); // prevent form submission default behavior

   try {
      // Falsy spell input:
      const url = 'https://www.dnd5eapi.co/api/spells/' + input.toLowerCase().replace(/\s+/g, '-');
      const response = await fetch(url);

      if (!response.ok) {
         throw new Error('Spell not found');
      }

      const result = await response.json();

      entry++;
      const article = document.createElement('article');
      article.id = entry;
      results.appendChild(article);
      Object.entries(result).forEach(([key, value]) => {
         // Clean data:
         let resultFormat = Array.isArray(value) ? value.join(', ') : typeof value === 'object' && value !== null ? JSON.stringify(value, null, 2) : value
         switch (key) {
            case 'name':
            case 'desc':
            case 'higher_level':
            case 'range':
            case 'duration':
            case 'casting_time':
            case 'level':
               if (resultFormat) { new RequestTextStrong(key.replace(/_/g, ' ').toUpperCase(), entry) }
               new RequestText(resultFormat, entry);
               break;
            default:
               break;
         }
      });
      const hr = document.createElement('hr');
      results.appendChild(hr);
      document.getElementById(entry).scrollIntoView();
      const anchorRequest = document.createElement('a');
      anchorRequest.textContent = entry + '. ' + input.toUpperCase();
      anchorRequest.href = `#${entry}`;
      resultsNav.appendChild(anchorRequest)
      return result;
   } catch (error) {
      // Falsy spell input:
      const errText = document.querySelector('#errorText');
      errText.textContent = 'Nothing found for your search. Please double-check your spelling and try again.'
      console.error(error)
   }
}

document.addEventListener('submit', (e) => {
   const input = document.querySelector('#requestInput').value;
   request(e, input);
});
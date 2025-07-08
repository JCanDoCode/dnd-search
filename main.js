// DND API SEARCH MODEL
// v1.1.0

const results = document.querySelector("#results");
const hr = document.createElement('hr');

class RequestText {
   constructor(text) {
      const para = document.createElement('p');
      para.textContent = text;
      results.appendChild(para);
   }
}
class RequestTextStrong {
   constructor(text) {
      const h3 = document.createElement('h3');
      h3.textContent = text;
      results.appendChild(h3);
   }
}

async function request(e, input) {
   e.preventDefault(); // prevent form submission default behavior

   try {
      // Falsy spell input:
      const url = 'https://www.dnd5eapi.co/api/spells/' + input.toLowerCase().replace(/\s+/g, '-');
      const response = await fetch(url);

      if (!response.ok) {
         throw new Error("Spell not found");
      }

      const result = await response.json();
      
      Object.entries(result).forEach(([key, value]) => {
         // Clean data:
         let resultFormat = Array.isArray(value) ? value.join(', ') : typeof value === 'object' && value !== null ? JSON.stringify(value, null, 2) : value
         switch (key) {
            case 'name':
               new RequestTextStrong(key);
               new RequestText(resultFormat);
               break;
            case 'desc':
               new RequestTextStrong(key);
               new RequestText(resultFormat);
               break;
            case 'higher_level':
               new RequestTextStrong(key);
               new RequestText(resultFormat);
               break;
            case 'range':
               new RequestTextStrong(key);
               new RequestText(resultFormat);
               break;
            case 'level':
               new RequestTextStrong(key);
               new RequestText(resultFormat);
               break;
            default:
               break;
         }
      });
      return result;
   } catch (error) {
      // Falsy spell input:
      alert('Something went wrong lol. Maybe search elsewhere? Oh wait, this just in from intel corps, "Thank u Peter." Thanks, Me');
      console.error(error);
   }
}

document.addEventListener("submit", (e) => {
   const input = document.getElementById('requestInput').value;
   request(e, input);
});
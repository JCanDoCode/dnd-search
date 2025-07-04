// DND API SEARCH MODEL

const results = document.querySelector("#results");

class RequestTextLook {
   constructor(text) {
      const para = document.createElement('p');
      para.textContent = text;
      results.appendChild(para);
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
         let resultFormat = Array.isArray(value) ? value.join(', ') : typeof value === 'object' && value !== null ? JSON.stringify(value, null, 2) : value
         new RequestTextLook(`${key}: ${resultFormat}`);
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
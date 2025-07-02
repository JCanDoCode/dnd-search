const results = document.querySelector("#results")

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
    const url = 'https://www.dnd5eapi.co/api/spells/' + input.toLowerCase();
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Spell not found");
    }

    const result = await response.json();

    new RequestTextLook(result.name);
    result.desc.forEach(descText => {
      new RequestTextLook(descText);
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
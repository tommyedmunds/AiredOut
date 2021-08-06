document.addEventListener('DOMContentLoaded', () => {
  // async function onsuccess(position) {
  // The position results is the object storing location properties.

  const city = document.querySelector('.city');
  const state = document.querySelector('.state');
  const aqi = document.querySelector('.aqiInner');
  const pollutionDes = document.getElementById('description');
  const img = document.getElementById('icon');

  const body = document.getElementsByTagName('BODY')[0];
  const title = document.querySelector('.title');

  const greenTitle = document.querySelector('.greenTitle');
  const greenP = document.querySelector('.greenP');
  const greenImg = document.getElementById('greenImg');

  const spinner = document.querySelector('#lds-spinner');

  async function getCurrentTab() {
    try {
      let queryOptions = { active: true, currentWindow: true };
      let tab = await chrome.tabs.query(queryOptions);
      let greenUrl = tab[0].url;
      let newUrl = greenUrl.substring(0, greenUrl.indexOf('.com'));
      newUrl += '.com';
      newUrl = newUrl.replace('https://www.', '');
      newUrl = newUrl.replace('http://www.', '');
      newUrl = newUrl.replace('https://', '');
      newUrl = newUrl.replace('http://', '');
      // if ((greenUrl[greenUrl.length - 1] = '/')) {
      //  greenUrl = greenUrl.slice(0, -1);
      // }
      console.log(newUrl);
      fetch(`https://api.thegreenwebfoundation.org/greencheck/${newUrl}`)
        .then((jsonResult) => jsonResult.json())
        .then((result) => {
          console.log(result);
          if (result.green) {
            spinner.classList.add('hidden');

            greenTitle.innerText = 'GREEN';
            greenP.innerHTML = `This site is green according to <span><a href='https://www.thegreenwebfoundation.org/' target="_blank">The Green Web Foundation</a></span>`;

            greenImg.src =
              'https://www.thegreenwebfoundation.org/wp-content/themes/tgwf2015/img/green-web-smiley-good.svg';
          } else {
            spinner.classList.add('hidden');
            greenTitle.innerText = 'NOT GREEN';
            greenP.innerHTML = `This site is not green according to <span><a href='https://www.thegreenwebfoundation.org/' target="_blank">The Green Web Foundation</a></span>`;
            greenImg.src =
              'https://www.thegreenwebfoundation.org/wp-content/themes/tgwf2015/img/green-web-smiley-bad.svg';
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }
  getCurrentTab();

  fetch(
    `http://api.airvisual.com/v2/nearest_city?key=93815843-9f41-4e6e-b1c3-028ea2be6571`
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      city.innerText = res.data.city + ',  ';
      state.innerText = res.data.state;

      aqi.innerText += res.data.current.pollution.aqius;

      let pollution = res.data.current.pollution.aqius;

      if (pollution <= 50) {
        pollutionDes.innerText =
          'Good: Air quality is satisfactory, and air pollution poses little or no risk.';
        body.classList.add('green');
      }

      if (pollution >= 51 && pollution <= 100) {
        pollutionDes.innerText =
          'Moderate: Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.';

        body.classList.add('yellow');
      }

      if (pollution >= 101 && pollution <= 150) {
        pollutionDes.innerText =
          'Unhealthy for Sensitive Groups: Members of sensitive groups may experience health effects. The general public is less likely to be affected.';
        body.classList.add('orange');
      }
      if (pollution >= 151 && pollution <= 200) {
        pollutionDes.innerText =
          'Unhealthy: Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.';
        body.classList.add('red');
      }
      if (pollution >= 201 && pollution <= 300) {
        pollutionDes.innerText =
          'Very Unhealthy: 	Health alert: The risk of health effects is increased for everyone.';
        body.classList.add('purple');
      }
      if (pollution >= 301) {
        pollutionDes.innerText =
          'Hazardous: Health warning of emergency conditions: everyone is more likely to be affected.';
        body.classList.add('maroon');
      }

      const date = new Date();

      const hour = date.getHours();

      if (hour >= 5 && hour < 12) {
        title.innerText = 'Good Morning,';
      }

      if (hour >= 12 && hour < 18) {
        title.innerText = 'Good Afternoon,';
      }

      if (hour >= 18 || hour < 5) {
        title.innerText = 'Good Evening,';
        body.className = '';
        body.classList.add('night');
        title.style.color = 'white';
      } else {
        title.style.color = '#6e6e6e';
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

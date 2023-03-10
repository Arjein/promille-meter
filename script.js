function time_until_sober(bac, metabolismRate) {
  console.log("BAC: " + bac + "| Rate:" + metabolismRate);
  const hours = bac / metabolismRate;
  const minutes = (hours - Math.floor(hours)) * 60;
  const formattedMinutes = minutes.toFixed().toString().padStart(2, "0");
  if (hours < 0) {
    return { hours: 0, minutes: "00" };
  }
  return { hours: Math.floor(hours), minutes: formattedMinutes };
}

function calculateBAC(
  weight,
  height,
  gender,
  age,
  alcoholConsumed,
  timeElapsed
) {
  const bloodVolume = gender === "male" ? 0.08 * weight : 0.06 * weight;
  const bodyWater = height * 0.725 * 0.01465 + weight * 0.58 - 0.015 * age;
  const distributionRatio = bloodVolume / bodyWater;
  const metabolismRate = gender === "male" ? 0.015 : 0.017;

  const absorbedAlcohol = alcoholConsumed - metabolismRate * timeElapsed;
  const distributionAlcohol = absorbedAlcohol * distributionRatio;
  var bac = // Thats bac value
    (distributionAlcohol / (weight * 1000)) * 100 -
    (timeElapsed / 60) * metabolismRate;
  let promille = bac * 10;
  let sober_time = time_until_sober(promille, metabolismRate);
  return [Math.max(promille.toFixed(3), 0), sober_time]; // Returns promille.
}

function calculateAlcoholConsumed(volume, percentage) {
  var alcoholGrams = (volume * percentage * 0.8) / 100;
  return alcoholGrams;
}

function calculatePromille() {
  var age = document.getElementById("ageInput").value;
  var height = document.getElementById("heightInput").value;
  var weight = document.getElementById("weightInput").value;
  var genderMale = document.querySelector(".gender-male");
  let gender;
  if (genderMale.classList.contains("active")) {
    gender = "male";
  } else {
    gender = "female";
  }

  var timeElapsed = document.getElementById("timeSpentInput").value;

  var beerMl = document.getElementById("beerMl").value;
  var beerTenseMl = document.getElementById("beerTenseMl").value;
  var wineMl = document.getElementById("wineCl").value;

  var beerSelect = document.getElementById("beerSelect").value;
  var beerTenseSelect = document.getElementById("beerTenseSelect").value;
  var wineSelect = document.getElementById("wineSelect").value;

  var whiskeySingle = document.getElementById("whiskeySingle").value * 42;
  var whiskeyDouble = document.getElementById("whiskeyDouble").value * 84;
  var tequila = document.getElementById("tequila").value;
  var tequilaMl = document.getElementById("tequilaMl").value;

  var alcohol_gr = 0;
  console.log(whiskeySingle);
  console.log(whiskeyDouble);
  console.log(beerMl);
  console.log(beerTenseMl);
  console.log(wineMl);

  if (beerSelect != 0) {
    alcohol_gr += calculateAlcoholConsumed(beerSelect * beerMl, 5);
    console.log("Alcogolgr:" + alcohol_gr);
  }
  if (beerTenseSelect != 0) {
    alcohol_gr += calculateAlcoholConsumed(beerTenseMl * beerTenseSelect, 7.5);
    console.log("Alcogolgr:" + alcohol_gr);
  }

  if (wineSelect != 0) {
    alcohol_gr += calculateAlcoholConsumed(wineMl * wineSelect, 12);
    console.log("Alcogolgr:" + alcohol_gr);
  }

  if (whiskeySingle != 0) {
    alcohol_gr += calculateAlcoholConsumed(whiskeySingle, 40);
    console.log("Alcogolgr:" + alcohol_gr);
  }
  if (whiskeyDouble != 0) {
    alcohol_gr += calculateAlcoholConsumed(whiskeyDouble, 40);
    console.log("Alcogolgr:" + alcohol_gr);
  }
  if (tequila != 0) {
    alcohol_gr += calculateAlcoholConsumed(tequila * tequilaMl, 40);
    console.log("Alcogolgr:" + alcohol_gr);
  }

  console.log("Consumed Alcohol(gr):" + alcohol_gr);
  const [ebac, soberTime] = calculateBAC(
    82,
    184,
    gender,
    21,
    alcohol_gr,
    timeElapsed
  );
  console.log(ebac);
  console.log("BAC: " + ebac + "%");
  console.log(
    "Time Until Sober:  " + soberTime.hours + ":" + soberTime.minutes
  );
  let promilledoc = document.getElementById("promille-value");
  let soberdoc = document.getElementById("sober-value");
  if (ebac < 0.04) {
    console.log("INSIDE");
    promilledoc.style.color = "#0B8457";
  } else if (ebac <= 0.058 && ebac >= 0.042) {
    promilledoc.style.color = "#FFA500";
  } else {
    promilledoc.style.color = "#DC3545";
  }
  promilledoc.innerHTML = ebac + "%";
  soberdoc.innerHTML = soberTime.hours + ":" + soberTime.minutes;
}

const { performance } = require('perf_hooks');
const puppeteer = require('puppeteer');

const scrapeGoogleSearch = async (query) => {
    const startTime = performance.now();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.google.com/search?q=${query}`);
    const html = await page.content();
    console.log("Loading Time for Pageload: ", (performance.now() - startTime).toFixed(2), "ms");

  //action 1: get the placeId and the review link
    const dataPidRegex = /data-pid="([^"]+)"/;
    const match = html.match(dataPidRegex);
    const placeId = match ? match[1] : null;
    console.log("PlaceId ", placeId);
    console.log("Loading Time for PlaceId: ", (performance.now() - startTime).toFixed(2), "ms");

    const reviewLink = placeId ? `https://search.google.com/local/reviews?placeid=${placeId}` : null;
    console.log("Review link ", reviewLink);
    console.log("Loading Time for Review link: ", (performance.now() - startTime).toFixed(2), "ms");

  //action 2: get the rating
    const ratingRegex = /<span style="margin-right:5px" class="Aq14fc" aria-hidden="true">([^<]+)<\/span>/;
    const match2 = html.match(ratingRegex);
    const rating = match2 ? match2[1] : null;
    console.log("Rating ", rating);
    console.log("Loading Time for Rating: ", (performance.now() - startTime).toFixed(2), "ms");

  //action 3: get the number of review
    const reviewRegex = /<span>([0-9]+)&nbsp;avis Google<\/span>/;
    const match3 = html.match(reviewRegex);
    const numberOfReview = match3 ? match3[1] : null;
    console.log("Number of review: ", numberOfReview);
    console.log("Loading Time for Number of review: ", (performance.now() - startTime).toFixed(2), "ms");

    await browser.close();
    return {placeId,reviewLink,rating,numberOfReview};

}

scrapeGoogleSearch("DIAGNOSYS balbins")




//https://www.google.com/search?q=try+regex
//https://www.google.com/search?q=DIAGNOSYS+balbins
//https://google.com/maps/search/DIAGNOSYS+balbins


//Longer method to get the number of reviews with cheerio
        //const cheerio = require('cheerio');

        // const $ = cheerio.load(html);
        // const selectedElement = $('.hqzQac a span:first');
        // const numberOfReview = selectedElement.text();  
        // console.log("Number of review: ", numberOfReview);
        // console.log("Loading Time for Number of review: ", (performance.now() - startTime).toFixed(2), "ms");








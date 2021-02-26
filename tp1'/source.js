const NB_WORDS_PREVIEW = 50;
const order_items = [0, 0, 0, 0]

const order = {
    soap: 0,
    rag: 0,
    airFreshener: 0,
    bulbs: 0,
}

getData("./news.json", displayNews);

function getPreview(newsBodyContent) {
    const words = newsBodyContent.split(" ");
    return newsBodyContent.substr(0, newsBodyContent.indexOf(words[Math.min(words.length -1, NB_WORDS_PREVIEW)]));
}

function displayNews(newsData) {
    if (!newsData) return;

    let newsContainer = document.getElementById("news-container");
    let newsTitle;
    let newsBody;
    let newsBodyContent;
    for (let news of newsData.news){
        newsTitle = document.createElement("div");
        newsTitle.innerHTML = news.title;
        newsTitle.className = "news-title";
        newsBody = document.createElement("p");
        newsBody.className = "news-content";
        newsBodyContent = news.body;
        newsBody.innerHTML = getPreview(newsBodyContent);
        newsContainer.appendChild(newsTitle);
        newsContainer.appendChild(newsBody);
    }
}

function getData(fileName, callBack){
    fetch(fileName)
        .then(response =>response.json())
        .then(data => {
            callBack(data);
        })
}

function updateJsonOrder() {
    order.soap = order_items[0]
    order.rag = order_items[1];
    order.airFreshener = order_items[2];
    order.bulbs = order_items[3];
}

function updateOrder(newValue, index){
    if(parseInt(newValue, 10))
        order_items[index] = parseInt(newValue,10);
    updateJsonOrder();
}
function incQuantity(index, valId){
    order_items[index]++;
    document.getElementById(valId).value = order_items[index];
    updateJsonOrder();
}

function decQuantity(index, valId){
    order_items[index] = Math.max(order_items[index]-1, 0);
    document.getElementById(valId).value = order_items[index];
    updateJsonOrder();
}

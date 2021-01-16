function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value
    Client.urlCheck(formText)

    console.log("::: Form Submitted :::")
    posting('http://localhost:8081/api', {url: formText})
        .then(res => {
            return res.json()
        })
        .then(function (datas) {
            document.getElementById('polarity').innerHTML = 'POLARITY: ' + polarityCheck(datas.score_tag);
            document.getElementById("agreement").innerHTML = `AGREEMENT: ${datas.agreement}`;
            document.getElementById("subjectivity").innerHTML = `SUBJECTIVITY: ${datas.subjectivity}`;
            document.getElementById("confidence").innerHTML = `CONFIDENCE: ${datas.confidence}`;
            document.getElementById("irony").innerHTML = `Irony: ${datas.irony}`;
        })
}
// Async Post 
const posting = async (url = "", data = {}) => {
    console.log('Sentiment Analyzing:', data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const fullData = await response.json();
        console.log('Data delivered:', fullData)
        return fullData;
    } catch (error) {
        console.log('error', error);
    }
};

// polarityCheck for Output
const polarityCheck = (score) => {
    let display;
    switch (score) {
        case 'NONE':
            display = 'no sentiment';
        case 'P+':
            display = 'high positive';
            break;
        case 'P':
            display = 'positive';
            break;
        case 'NEW':
            display = 'neutral';
            break;
        case 'N':
            display = 'negative';
            break;
        case 'N+':
            display = 'high negative';
            break;
        
    }
    return display();
}

export { handleSubmit}
export { polarityCheck}
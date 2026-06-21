let storedReasons = [];
let analysed = false;

function resetOutput() {

    analysed = false;

    document.getElementById("percentage").innerHTML = "";

    document.getElementById("category").innerHTML = "";

    document.getElementById("riskBar").style.width = "0%";

    document.getElementById("reasonBox").style.display = "none";

    document.getElementById("reasonBox").innerHTML = "";

    storedReasons = [];
}

function checkMessage() {

    analysed = true;

    let text =
    document.getElementById("message")
    .value
    .toLowerCase()
    .trim();

    if(text === ""){

        document.getElementById("reasonBox").style.display = "block";

        document.getElementById("reasonBox").innerHTML =
        "<b>PLEASE ENTER A MESSAGE FIRST!</b>";

        analysed = false;

        return;
    }

    let score = 0;

    storedReasons = [];

    if(text.includes("urgent")){

        score += 20;

        storedReasons.push(
        "Urgency detected"
        );
    }

    if(text.includes("otp")){

        score += 30;

        storedReasons.push(
        "OTP request"
        );
    }

    if(text.includes("bank")){

        score += 20;

        storedReasons.push(
        "Bank related message"
        );
    }

    if(text.includes("verify")){

        score += 20;

        storedReasons.push(
        "Verification request"
        );
    }

    if(text.includes("click here")){

        score += 25;

        storedReasons.push(
        "Suspicious action"
        );
    }

    if(
        text.includes("http") ||
        text.includes("https") ||
        text.includes("bit.ly")
    ){

        score += 25;

        storedReasons.push(
        "Link detected"
        );
    }

    score = Math.min(score,100);

    let riskBar =
    document.getElementById("riskBar");

    riskBar.style.width =
    score + "%";

    let categoryText = "";

    if(score <= 30){

        riskBar.style.background =
        "#22c55e";

        categoryText =
        "CATEGORY : LOW RISK";
    }

    else if(score <= 70){

        riskBar.style.background =
        "#facc15";

        categoryText =
        "CATEGORY : MEDIUM RISK";
    }

    else{

        riskBar.style.background =
        "#ef4444";

        categoryText =
        "CATEGORY : HIGH RISK";
    }

    document.getElementById("percentage").innerHTML =
    "RISK PERCENTAGE : " + score + "%";

    document.getElementById("category").innerHTML =
    categoryText;

    document.getElementById("reasonBox").style.display =
    "none";
}

function showReason(){

    let box =
    document.getElementById("reasonBox");

    if(!analysed){

        box.innerHTML =
        "<b>CLICK AND ANALYSE THE RISK PERCENTAGE FIRST!</b>";

        box.style.display =
        "block";

        return;
    }

    if(storedReasons.length === 0){

        box.innerHTML =
        "<b>REASON :</b><br><br>• No issues detected";
    }

    else{

        let reasonList = "";

        for(let reason of storedReasons){

            reasonList +=
            "• " + reason + "<br>";
        }

        box.innerHTML =
        "<b>REASON :</b><br><br>" +
        reasonList;
    }

    box.style.display =
    "block";
}
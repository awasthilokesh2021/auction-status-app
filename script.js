
const endpoint = `https://gauravgitacc.github.io/postAppData/auctionData.json`;
const container = document.getElementById("container");

let backgroundColorMapping = {
  APPROVED: "blue",
  PENDING: "yellow",
  CANCELLED: "red",
  COMPLETED: "green",
};

let textColorMapping = {
  APPROVED: "white",
  PENDING: "black",
  CANCELLED: "white",
  COMPLETED: "white",
};

function renderDataOntoUI(data) {
  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    const { status, caseNumber, fromLocation, toLocation, fare, date } = item;

    function navigate() {
      let a = document.createElement("a");
      a.href = `./auction.html`;
      document.cookie = `caseNumber=${caseNumber}; path=/auction/auction.html`;
      a.click();
    }

    card.innerHTML = `
                    <div class="top-container">
                        <div class="left">
                            <span class="badge" style="color: ${textColorMapping[status]}; background-color: ${backgroundColorMapping[status]}">${status}</span>
                            <span>${caseNumber}</span>
                        </div>
                        <div class="right">
                            ${date}
                        </div>
                    </div>
                    <div class="bottom-container">
                        <p style="font-weight: 600;">${fromLocation}</p>
                        <p>${toLocation}</p>
                        <p class="price">${fare}</p>
                    </div>`;

    card.addEventListener("click", navigate);

    container.appendChild(card);
  });
}

async function fetchAuctionDetails() {
  
  try {
    const response = await fetch(endpoint, {method:"GET"});
    const result = await response.json();
    // result = array of objects
    renderDataOntoUI(result);
  } 
  
  catch (error) {
    alert(error.message);
  }
  
}

fetchAuctionDetails();

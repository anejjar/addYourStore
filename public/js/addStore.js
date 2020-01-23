const form = document.getElementById("store-form");
const storeName = document.getElementById("Name");
const storeAdress = document.getElementById("Address");

async function addStore(e) {
  e.preventDefault();
  if (storeName.value === "" || storeAdress.value === "") {
    alert("fill out the fields");
    return 0;
  }
  const sendBody = {
    name: storeName.value,
    address: storeAdress.value
  };
  try {
    const res = await fetch("/api/stores", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(sendBody)
    });
    if (res.status === 400) {
      throw Error("Store exists");
    }
    // 10 main st amesbury ma
    alert("store added");
    window.location.href = "/index.html";
  } catch (err) {
    alert("error");
    console.log("error", err);
    return;
  }
}
form.addEventListener("submit", addStore);

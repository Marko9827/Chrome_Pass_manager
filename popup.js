const clearPasswordsBtn = document.getElementById("clear-passwords-btn"),
    tag_h1 = document.querySelector("h1"),
    myInput = document.getElementById("myInput"),
    table = document.getElementById("myTable");

let passwordsDiv = document.getElementById("passwords-div");





clearPasswordsBtn.addEventListener("click", () => {
    chrome.storage.sync.set({ passwords: [] });
    passwordsDiv.remove();
    passwordsDiv = document.createElement("div");
    document.body.appendChild(passwordsDiv);
})



const getUrls = async () => {
    //const { passwords } = await chrome.storage.sync.get("passwords");
    const passwords = [{
        password: "amefk323 pass",
        url: "https://www.youtube.com/watch?v=tl7gaL2me8k&list=RDtl7gaL2me8k&start_radio=1"
    }]
    passwords.forEach(password => {
        const d_tr = document.createElement("tr"),
            d_tr1 = document.createElement("td"),
            d_tr2 = document.createElement("td"),
            d_tr2_btn = document.createElement("i"),
            d_tr3 = document.createElement("td"),
            d_tr4 = document.createElement("td"),
            d_tr5 = document.createElement("td"),
            favicon = document.createElement("img");



        const linkEl = document.createElement("a");
        linkEl.href = password.url;
        linkEl.classList.add("link");
        linkEl.innerText = password.url;
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

        favicon.src = "http://www.google.com/s2/favicons?domain=" + password.url;

        d_tr1.appendChild(favicon);
        d_tr1.appendChild(linkEl);
        d_tr2.appendChild(deleteBtn);

        d_tr.setAttribute("data-id", "is_value");
        d_tr.appendChild(d_tr1);
        d_tr.appendChild(d_tr2);
        d_tr.appendChild(d_tr3);
        //passwordsDiv.appendChild(linkEl);
        //  passwordsDiv.appendChild(deleteBtn);
        table.appendChild(d_tr);
        deleteBtn.addEventListener("click", () => {
            const updatedPasswords = passwords.filter(pwd => pwd !== password);
            chrome.storage.sync.set({ passwords: updatedPasswords });

            linkEl.remove();
            deleteBtn.remove();
        })
    })
}

myInput.onkeyup = async () => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

const myFunction = async () => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

getUrls();
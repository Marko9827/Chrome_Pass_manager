

document.body.onload = function () {

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



    const dropdown = (id) => {
        const button = document.querySelector(`.dropdown-toggle[data-drop-id="${id}"]`),
            button_menu = document.querySelector(`.dropdown-menu[data-drop-id="${id}"]`);

        if (button_menu.getAttribute("aria-expanded") !== "true") {
            button_menu.style.display = "block";
            button_menu.setAttribute("aria-expanded", true);
        } else {

            button_menu.style.display = "none";
            button_menu.setAttribute("aria-expanded", false);
        }
    }

    const dropdownGenerator = async (d_tr3, i, passwords, linkEl, deleteBtn) => {
        const div = document.createElement("div"),
            div_menu = document.createElement("div"),
            button = document.createElement("button"),
            hi = document.createElement("i"),
            menus = [
                {
                    id: 0,
                    what: "del",
                    icon:"fas fa-trash-alt",
                    title:"Delete password"
                }
            ];
        hi.setAttribute("class", "fas fa-ellipsis-v");
        div.classList.add("dropdown");
        div.classList.add("forSearch");
        div_menu.classList.add("dropdown-menu");
        button.classList.add("dropdown-toggle");
        button.type = "button";
        button.id = "dropdownMenuButton";
        button.setAttribute("aria-haspopup", "true");
        button.setAttribute("data-drop-id", i);
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("title", "Options");
        button.appendChild(hi);
        div_menu.setAttribute("class", "dropdown-menu");
        div_menu.setAttribute("data-drop-id", i);
        div_menu.setAttribute("aria-labelledby", "dropdownMenuButton");
        div.appendChild(button);
        menus.forEach(function (h) {
            const a = document.createElement("a");
            // <a class="dropdown-item" href="#">Action</a>
            a.setAttribute("class", "dropdown-item");
            if (h.what == "del") {
                var i = document.createElement("i");
                i.setAttribute("class",`${h.icon}`);

                a.appendChild(i);
                a.innerHTML += h.title;
                a.addEventListener("click", function () {
                    const updatedPasswords = passwords.filter(pwd => pwd !== password);
                    chrome.storage.sync.set({ passwords: updatedPasswords });

                    linkEl.remove();
                    deleteBtn.remove();
                });
            }
            div_menu.appendChild(a);
        });

        div.appendChild(div_menu);

        d_tr3.appendChild(div);
    }

    const getUrls = async () => {
        // const { passwordk } = await chrome.storage.sync.get("passwords");
        var i = 0;
        const passwords = [{
            password: "amefk323 pass",
            url: "https://www.youtube.com/watch?v=tl7gaL2me8k&list=RDtl7gaL2me8k&start_radio=1"
        }]
        passwords.forEach(password => {

            const d_tr = document.createElement("tr"),
                d_tr1 = document.createElement("td"),
                d_tr2 = document.createElement("td"),
                d_tr2_div = document.createElement("div"),
                d_tr2_btn = document.createElement("i"),
                d_tr3 = document.createElement("td"),
                d_tr4 = document.createElement("td"),
                d_tr5 = document.createElement("td"),
                Eyes_I = document.createElement("i");
                favicon = document.createElement("img");

            Eyes_I.setAttribute("class","fas fa-eye show_hide_password");
            Eyes_I.title = "Show/Hide password";

            const linkEl = document.createElement("a");
            linkEl.href = password.url;
            linkEl.classList.add("link");
            linkEl.innerText = password.url;
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

            d_tr2_div.classList.add("div_options");
            d_tr2_div.appendChild(deleteBtn);

            // d_tr3.appendChild(
            d_tr3.appendChild(Eyes_I);
            dropdownGenerator(d_tr3, i, passwords, linkEl, deleteBtn);


            favicon.src = "http://www.google.com/s2/favicons?domain=" + password.url;

            d_tr1.appendChild(favicon);
            d_tr1.appendChild(linkEl);
            d_tr2.appendChild(d_tr2_div);
            d_tr.setAttribute("data-int", i);
            d_tr.setAttribute("data-id", "is_value");
            d_tr.appendChild(d_tr1);
          //  d_tr.appendChild(d_tr2);
            d_tr.appendChild(d_tr3);
            //passwordsDiv.appendChild(linkEl);
            //  passwordsDiv.appendChild(deleteBtn);
            table.appendChild(d_tr);
            deleteBtn.addEventListener("click", () => {
                const updatedPasswords = passwords.filter(pwd => pwd !== password);
                chrome.storage.sync.set({ passwords: updatedPasswords });

                linkEl.remove();
                deleteBtn.remove();
            });

            document.querySelectorAll(".dropdown-toggle").forEach(function (v) {
                const id = v.getAttribute("data-drop-id");
                v.onclick = function () {
                    dropdown(id);
                };

            });
            i++;
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
};
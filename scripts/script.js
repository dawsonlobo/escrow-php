async function loadPageSection(sectionName) {
  try {
    // console.log("hi")
    const app = document.getElementById("main-section");
    const currentSection = localStorage.getItem("currentSection");

    // todo: check if input is valid

    // checking if empty then goto listing

    sectionName =
      sectionName === ""
        ? currentSection === ""
          ? "listing"
          : currentSection
        : sectionName;

    // Load HTML only when required
    const htmlResponse = await fetch(`layouts/${sectionName}.html`);

    const html = await htmlResponse.text();

    // todo: check if above res is 200

    localStorage.setItem("currentSection", sectionName);

    console.log(localStorage.getItem("currentSection"));

    // Insert HTML
    app.innerHTML = html;

    // Now call API
    const apiResponse = await fetch("/api/user");

    const data = await apiResponse.json();

    // Fill dynamically loaded HTML
    // app.querySelector(".user-name").textContent = data.name;
    // app.querySelector(".user-email").textContent = data.email;
  } catch (error) {
    console.log(error);
  }
}

/* =========================================
       SIDEBAR TOGGLE
    ========================================== */

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");

  const overlay = document.getElementById("sidebarOverlay");

  sidebar.classList.toggle("open");

  overlay.classList.toggle("open");
}

/* =========================================
       LOGOUT
    ========================================== */

function logout() {
  // Replace with your authentication logout logic

  window.location.href = "login.html";
}

/* =========================================
   CLOSE EDIT PROFILE
========================================= */

function closeEditProfile() {
  document.getElementById("profileModal").classList.remove("open");
}

function closeOfferPopup() {
  document.getElementById("offerModal").classList.remove("open");
}

/* =========================================
   SAVE PROFILE
========================================= */

function saveProfile() {
  const name = document.getElementById("editName").value.trim();

  const userId = document.getElementById("editUserId").value.trim();

  const email = document.getElementById("editEmail").value.trim();

  /* Basic validation */

  if (!name || !userId || !email) {
    showProfileToast("Error", "Please fill in all required fields.", true);

    return;
  }

  /* Basic email validation */

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    showProfileToast("Error", "Please enter a valid email address.", true);

    return;
  }

  /*
        Update UI

        Replace this section with your
        API request when your backend
        is ready.
    */

  document.getElementById("profileName").textContent = name;

  document.getElementById("profileUserId").textContent = userId;

  document.getElementById("profileEmail").textContent = email;

  closeEditProfile();

  showProfileToast("Success", "Profile updated successfully.", false);
}

/* =========================================
   SHOW TOAST
========================================= */

async function showProfileToast(title, message, isError = false) {
  console.log(title);

  let toast = document.getElementById("profileToast");

  // import if toast html not there

  if (!toast) {
    // load html

    const response = await fetch("components/popups/toast.html");

    if (!response.ok) {
      throw new Error("Failed to load HTML file");
    }

    const html = await response.text();

    document.getElementById("main-section").innerHTML += html;
    toast = document.getElementById("profileToast");
  }

  const toastTitle = document.getElementById("toastTitle");

  const toastMessage = document.getElementById("toastMessage");

  const toastIcon = document.getElementById("toastIcon");

  toastTitle.textContent = title;

  toastMessage.textContent = message;

  toast.classList.toggle("error", isError);

  toastIcon.textContent = isError ? "!" : "✓";

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

/* =========================================
   CLOSE MODAL ON BACKDROP CLICK
========================================= */

// document
//     .getElementById("profileModal")
//     .addEventListener(
//         "click",
//         function (event) {

//             if (
//                 event.target === this
//             ) {

//                 closeEditProfile();

//             }

//         }
//     );

/* =========================================
   EXPORT DATA
========================================= */

function exportData() {
  showProfileToast("Success", "Your account data is being prepared.", false);
}

/* =========================================
   DELETE ACCOUNT
========================================= */

function deleteAccount() {
  const confirmed = confirm(
    "Are you sure you want to delete your account? This action cannot be undone.",
  );

  if (!confirmed) {
    return;
  }

  /*
        Replace with your API request.

        Example:

        fetch("/api/delete-account", {
            method: "DELETE"
        })
    */

  showProfileToast("Success", "Account deletion request submitted.", false);
}

/* =========================================
   EDIT PROFILE
========================================= */

async function openEditProfile() {
  try {
    const profileModal = document.getElementById("profileModal");

    if (!profileModal) {
      // call and append
      // check if
      const response = await fetch("components/popups/editProfile.html");

      if (!response.ok) {
        throw new Error("Failed to load HTML file");
      }

      const html = await response.text();

      document.getElementById("main-section").innerHTML += html;
    }

    const modal = document.getElementById("profileModal");

    const name = document.getElementById("profileName").textContent.trim();

    const userId = document.getElementById("profileUserId").textContent.trim();

    const email = document.getElementById("profileEmail").textContent.trim();

    document.getElementById("editName").value = name;

    document.getElementById("editUserId").value = userId;

    document.getElementById("editEmail").value = email;
    console.log(11);
    console.log(modal);

    modal.classList.add("open");
  } catch (error) {
    console.log(error);
  }
}
/* =========================================
   EDIT PROFILE
========================================= */

async function openMakeOffer() {
  try {
    // todo: confirm if existing offer exits. if yes display confirmation

    const profileModal = document.getElementById("offerModal");

    if (!profileModal) {
      // call and append
      // check if

      const response = await fetch(`components/popups/makeOffer.html`);

      if (!response.ok) {
        throw new Error("Failed to load HTML file");
      }

      const html = await response.text();

      document.getElementById("main-section").innerHTML += html;
    }

    const modal = document.getElementById("offerModal");
    modal.classList.add("open");
  } catch (error) {
    console.log(error);
  }
}

async function cancelDeal() {
  try {
    // todo: confirm if deal exits. if yes display confirmation

    // show confirmation
    showConfirmPopup(
      "Confirmation",
      "Do you want to cancel the current deal?",
      (confirmed) => {
        if (confirmed) {
          // todo: call api

          // show toast
          showProfileToast(
            "Waiting",
            "Please wait for the other party to accept the cancellation!",
            false,
          );

          document.querySelector(`.cancel-deal-btn`).disabled = true;
          document.querySelector(`.deposit-btn`).disabled = true;

          // update UI

          // todo: changing button to "Cancel Deal"
          // Change to Make an offer
          // changeToMakeOffer();
        }
      },
    );
  } catch (error) {
    console.log(error);
  }
}

async function depositPopup(chatId, step = 1) {
  try {
    const profileModal = document.getElementById("offerModal");
    console.log("profileModal");
    console.log(profileModal);
    

    let fileName = "";
    // todo: call api and determine step

    switch (step) {
      case 0:
        fileName = "step0";
        break;
      case 1:
        fileName = "step1";
        break;
      case 2:
        fileName = "step2";
        break;
      case 3:
        fileName = "step3";
        break;
      default:
        alert("There is some issue. Please try again later (Error: DW01");
        return;
    }

    if (!profileModal) {
      // call and append
      // check if

      const response = await fetch(
        `components/popups/deposit/${fileName}.html`,
      );

      if (!response.ok) {
        throw new Error("Failed to load HTML file");
      }

      const html = await response.text();

      document.getElementById("main-section").innerHTML += html;
    } else {
      // since existing verify if same step else delete and add html code
      // take class of
      console.log("profileModal.className");
      console.log(profileModal.className);
      console.log("fileName");
      console.log(fileName);
      
      if (profileModal.className !== fileName) {
        const response = await fetch(
          `components/popups/deposit/${fileName}.html`,
        );
        if (!response.ok) {
          throw new Error("Failed to load HTML file");
        }

        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const newModal = doc.body.firstElementChild;
        const oldModal = document.getElementById("offerModal");

        oldModal.replaceWith(newModal);
      }
      // make visible
console.log();

      profileModal.classList.add("open");
    }

    if (step === 2) {
      let timeLeft = 3;
      const countdownElement = document.querySelector(".transaction-countdown");

      countdownElement.textContent = `${timeLeft} seconds`;

      const timer = setInterval(() => {
        timeLeft--;

        if (timeLeft > 0) {
          countdownElement.textContent = `${timeLeft} seconds`;
        } else {
          clearInterval(timer);
          countdownElement.textContent = "Expired";
          depositPopup(0,3);
        }
      }, 1000);
    }

    const modal = document.getElementById("offerModal");
    modal.classList.add("open");
  } catch (error) {
    console.log(error);
  }
}

async function makeOffer() {
  const data = {
    chain: document.getElementById("offerChain").value,
    type: document.getElementById("offerType").value,
    inr: Number(document.getElementById("offerInr").value),
    token: Number(document.getElementById("offerToken").value),
    rate: document.getElementById("offerRate").value,
    paymentMethod: document.getElementById("offerMethod").value,
  };

  console.log("Offer Data:", data);

  try {
    // Close modal
    document.getElementById("offerModal").classList.remove("open");

    const response = await fetch("/api/make-offer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const result = await response.json();

    console.log("Offer created:", result);
  } catch (error) {
    console.error("Error making offer:", error);
  }
}

async function acceptOffer(id) {
  try {
    // take confirmation
    showConfirmPopup(
      "Confirmation",
      "Do you want to accept the offer?",
      (confirmed) => {
        if (confirmed) {
          // todo: call api

          // show toast
          showProfileToast(
            "Offer Accepted",
            "You have accepted the offer!",
            false,
          );

          // update UI

          // todo: changing button to "Cancel Deal"
          // todo: verify if the user is seller. If yes then add deposit button on top right corner along with cancel deal
          changeToCancelDeal(id);
          checkAndAddDeposit();
          //todo: confirm & then  disable both buttons
          disableAcceptDecline(id);
        }
      },
    );
  } catch (error) {
    console.log(error);
  }
}

function disableAcceptDecline(id) {
  document.querySelector(
    `.chat-item[data-chat-id="${id}"] .offer-actions .accept-btn`,
  ).disabled = true;
  document.querySelector(
    `.chat-item[data-chat-id="${id}"] .offer-actions .decline-btn`,
  ).disabled = true;
}

async function declineOffer(id) {
  try {
    // take confirmation
    showConfirmPopup(
      "Confirmation",
      "Do you want to decline the offer?",
      (confirmed) => {
        if (confirmed) {
          // todo: call api

          // show toast
          showProfileToast(
            "Offer declined",
            "You have declined the offer!",
            false,
          );

          // update UI
          // todo: enable the mark an offer

          disableAcceptDecline(id);
        }
      },
    );
  } catch (error) {
    console.log(error);
  }
}

async function showConfirmPopup(title, message, callback) {
  try {
    let popup = document.getElementById("confirmPopup");

    console.log(popup);

    if (!popup) {
      // call and append
      // check if

      const response = await fetch(`components/popups/confirmation.html`);

      if (!response.ok) {
        throw new Error("Failed to load HTML file");
      }

      const html = await response.text();

      document.getElementById("main-section").innerHTML += html;
    }

    popup = document.getElementById("confirmPopup");

    document.getElementById("confirmTitle").textContent = title;
    document.getElementById("confirmMessage").textContent = message;
    popup.classList.add("active");

    popup._callback = callback;
  } catch (error) {
    console.log(error);
  }
}

function closeConfirmPopup() {
  const popup = document.getElementById("confirmPopup");

  popup.classList.remove("active");

  popup._callback = null;
}

function handleConfirm(result) {
  const popup = document.getElementById("confirmPopup");

  const callback = popup._callback;

  closeConfirmPopup();

  if (callback) {
    callback(result);
  }
}

function changeToCancelDeal(id) {
  try {
    const button = document.querySelector(".make-offer-btn");
    if (!button) {
      //todo: load button and inject
    } else {
      button.classList.remove("make-offer-btn");
      button.classList.add("cancel-deal-btn");

      button.textContent = "Cancel Deal";
      // button.setAttribute("onclick", `  ("${id}")`);
    }
  } catch (error) {
    console.log(error);
  }
}
async function checkAndAddDeposit() {
  try {
    const button = document.querySelector(".deposit-btn");
    if (!button) {
      //todo: load button and inject
      const response = await fetch("components/buttons/deposit.html");

      if (!response.ok) {
        throw new Error("Failed to load HTML file");
      }
      const html = await response.text();

      document.getElementById("chat-side-buttons").innerHTML =
        html + document.getElementById("chat-side-buttons").innerHTML;
    } else {
    }
  } catch (error) {
    console.log(error);
  }
}

function changeToMakeOffer() {
  try {
    const button = document.querySelector(".cancel-deal-btn");
    if (!button) {
      //todo: load button and inject
    } else {
      button.classList.remove("cancel-deal-btn");
      button.classList.add("make-offer-btn");

      button.textContent = "Make an Offer";
      // button.setAttribute("onclick", `  ("${id}")`);
    }
  } catch (error) {
    console.log(error);
  }
}

// Event listeners for click

document.addEventListener("click", function (event) {
  const button = event.target.closest(".accept-btn");
  if (!button) return;

  const chatId = button.closest(".chat-item").dataset.chatId;

  acceptOffer(chatId);
});

document.addEventListener("click", function (event) {
  const button = event.target.closest(".deposit-chat-btn");
  if (!button) return;

  const chatId = button.closest(".chat-item").dataset.chatId;

  depositPopup(chatId);
});

document.addEventListener("click", function (event) {
  const button = event.target.closest(".decline-btn");
  if (!button) return;

  const chatId = button.closest(".chat-item").dataset.chatId;

  declineOffer(chatId);
});

document.addEventListener("click", function (event) {
  const button = event.target.closest(".make-offer-btn");
  if (!button) return;
  openMakeOffer();
});
document.addEventListener("click", function (event) {
  const button = event.target.closest(".cancel-deal-btn");
  if (!button) return;
  cancelDeal();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (document.querySelector("div.profile-modal-overlay.open")) {
      closeOfferPopup();
    }
    if (document.querySelector("div.confirm-overlay.active")) {
      closeConfirmPopup();
    }
  }
});

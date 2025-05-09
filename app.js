// التسجيل (نفس الموجود سابقًا)
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("من فضلك املأ كل البيانات");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("تم التسجيل بنجاح");

      // إضافة بيانات المستخدم إلى Firestore
      return firebase.firestore().collection("users").doc(user.uid).set({
        email: email,
        lastDonation: null,
        bloodType: "",
        healthStatus: "جيد"
      });
    })
    .then(() => {
      console.log("تم حفظ بيانات المستخدم");
      registerForm.reset();
    })
    .catch((error) => {
      console.error("خطأ أثناء التسجيل:", error.message);
      alert("حدث خطأ: " + error.message);
    });
});

// تسجيل الدخول
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("تم تسجيل الدخول بنجاح");
      loginForm.reset();
    })
    .catch((error) => {
      console.error("خطأ أثناء تسجيل الدخول:", error.message);
      alert("حدث خطأ: " + error.message);
    });
});

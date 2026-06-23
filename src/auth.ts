import type { User } from "./types";

import { stopTimer, resumeTimer } from "./quiz";

import { showPasswordBtn, authError } from "./dom";

const signupBtn = document.getElementById("signupBtn") as HTMLButtonElement;

const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;

const usernameInput = document.getElementById("username") as HTMLInputElement;

const passwordInput = document.getElementById("password") as HTMLInputElement;

const authPage = document.getElementById("authPage") as HTMLDivElement;

const quizPage = document.getElementById("quizPage") as HTMLDivElement;

const logoutBtn = document.getElementById("logoutBtn") as HTMLButtonElement;

signupBtn.addEventListener("click", () => {
  authError.textContent = "";

  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  const existingUser = users.find(
    (user) => user.username === usernameInput.value,
  );

  if (existingUser) {
    authError.style.color = "red";

    authError.textContent = "Username already exists";

    return;
  }

  const newUser: User = {
    username: usernameInput.value,

    password: passwordInput.value,
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  authError.style.color = "green";

  authError.textContent = "Signup successful";
});

loginBtn.addEventListener("click", () => {
  authError.textContent = "";

  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  const foundUser = users.find(
    (user) =>
      user.username === usernameInput.value &&
      user.password === passwordInput.value,
  );

  if (foundUser) {
    authPage.style.display = "none";

    quizPage.style.display = "flex";

    resumeTimer();
  } else {
    authError.style.color = "red";

    authError.textContent = "Incorrect username or password";
  }
});

logoutBtn.addEventListener("click", () => {
  stopTimer();

  authPage.style.display = "flex";

  quizPage.style.display = "none";

  usernameInput.value = "";

  passwordInput.value = "";
});

showPasswordBtn.addEventListener("click", () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

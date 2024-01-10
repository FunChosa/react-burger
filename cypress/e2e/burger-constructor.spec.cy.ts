describe("can make an order", function () {
  before(function () {
    cy.visit("http://localhost:3000/");
    cy.viewport(1920, 1080); // установка разрешения
  });

  it("should login with valid credentials", function () {
    cy.get("[data-cy=ingredient-card-643d69a5c3f7b9001cfa093c]").as(
      "ingredient-card-bun"
    ); // поиск первой булки
    cy.get("[data-cy=ingredient-card-643d69a5c3f7b9001cfa0942]").as(
      "ingredient-card-sauce"
    ); // поиск первого соуса
    cy.get("[data-cy=ingredient-card-643d69a5c3f7b9001cfa0941]").as(
      "ingredient-card-main"
    ); // поиск первой начинки
    cy.get("@ingredient-card-bun").click(); // нажатие на первый ингредиент
    cy.get("[data-cy=modal]")
      .should("be.visible")
      .then(() => {
        // проверка видимости модального окна
        cy.get("[data-cy=ingredient-details]").should("be.visible");
      });
    cy.get("[data-cy=modal-close]").as("modal-close"); // поиск кнопки "закрыть"
    cy.get("@modal-close").click(); // нажатие на кнопку "закрыть"
    // переносим в конструктор булочку
    cy.get("[data-cy=burger-constructor]").as("burger-constructor");
    const dataTransfer = new DataTransfer();
    cy.get("@ingredient-card-bun").trigger("dragstart", {
      dataTransfer,
    });
    cy.get("@burger-constructor").trigger("drop", {
      dataTransfer,
    });
    // переносим в конструктор соус
    cy.get("[data-cy=burger-constructor]").as("burger-constructor");
    cy.get("@ingredient-card-sauce").trigger("dragstart", {
      dataTransfer,
    });
    cy.get("@burger-constructor").trigger("drop", {
      dataTransfer,
    });
    // переносим в конструктор начинку
    cy.get("[data-cy=burger-constructor]").as("burger-constructor");
    cy.get("@ingredient-card-main").trigger("dragstart", {
      dataTransfer,
    });
    cy.get("@burger-constructor").trigger("drop", {
      dataTransfer,
    });
    cy.get("button[type=button]").click(); // нажатие на кнопку "оформить заказ"
    cy.url().should("eq", "http://localhost:3000/login"); // проверка URL
    cy.get("input[name=email]").type("cofgak1@supuq.com"); // ввод логина
    cy.get("input[name=password]").type("123qweASD"); // ввод пароля
    cy.get("button[type=submit]").click(); // нажатие на кнопку "Войти"
    cy.url().should("eq", "http://localhost:3000/"); // проверка URL
    cy.get("button[type=button]").click(); // нажатие на кнопку "оформить заказ"

    cy.get("[data-cy=preloader]")
      .should("be.visible")
      .then(() => {
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(16000);
        cy.get("[data-cy=order-summary]")
          .should("be.visible")
          .then(() => {
            cy.get("@modal-close").click(); // нажатие на кнопку "закрыть"
          });
      });
  });
});

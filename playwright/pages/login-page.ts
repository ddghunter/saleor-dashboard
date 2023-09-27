import type {
  Locator,
  Page,
} from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId("email");
    this.passwordInput = page.getByTestId("password");
    this.signInButton = page.getByTestId("submit");
  }
  async typeEmail(email: string) {
    await this.emailInput.type(email);
  }
  async typePassword(password: string) {
    await this.passwordInput.type(password);
  }
  async clickSignInButton() {
    await this.signInButton.click();
  }
  async goto() {
    const CYPRESS_baseUrl = process.env.CYPRESS_baseUrl;
    const loginPageUrl =
      CYPRESS_baseUrl === "http://localhost:9000/"
        ? "http://localhost:9000/"
        : "/dashboard";
    await this.page.goto(loginPageUrl);
  }
}
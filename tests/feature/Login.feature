Feature: Login functionality

  Scenario: Successful Login to saucedemo application
    Given User is on saucedemo login page
    When user hit login button after entering username and password
    Then login should be successful and user can can page title

  Scenario Outline: Negative Login with invalid credentials
    Given User is on saucedemo login page
    When user enters username as "<username>" and password as "<password>"
    Then login should fail with error message

    Examples:
      | username      | password       |
      | invalid_user  | secret_pass    |
      | standard_user | wrong_password |
      | invalid_user  | wrong_password |
      | empty_user    | empty_pass     |

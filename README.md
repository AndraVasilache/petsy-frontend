#Development

This project uses [Node.js](https://nodejs.org/en/) for both development and production profiles. We use Node 16.11.1, but for optimal performance we recommend 14.17.6 or newer.
Before you can build this project, you must install and/or configure the project's dependencies. You can do so by using the following command:

```
npm install
```

In the future, you will only need to run this command when dependencies change in [package.json](package.json).

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json).

### Using Angular CLI

You can also use [Angular CLI](https://angular.io/cli) to generate some custom client code.

For example, the following command:

```
ng generate component my-component
```

will generate few files:

```
create src/main/webapp/app/my-component/my-component.component.html
create src/main/webapp/app/my-component/my-component.component.ts
update src/main/webapp/app/app.module.ts
```

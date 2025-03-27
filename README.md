## How to run
1. `npm i`
2. `ng serve`

By default `ru` locale is used, where the problem reproduces. The expected template is `{var}`, but it is empty.

But if you remove `"localize": ["ru"]` from `angular.json` and re-run the server, you will see the message as expected.

## The problem
### Use case:

I've tried to use ICU interpolation `{varName}` with `$localize` in TS files together with `intl-messageformat` library to allow construct messages like `My second Salesforce account`

```ts
const message = $localize`My {counter, selectordinal, =1 {} =2 {second} =3 {third} other {#th} } {title} account`;

new IntlMessageFormat(message, $localize.locale).format({counter: 2, title: 'Salesforce'}); // My second Salesforce account
```

It works OK with the default english dev run, but as soon as I add another language and just copy-paste the extracted messages files as is, and use that new locale for local run or build, the part `{title} account` is omitted from the message template and the code above invalidly start to return `My second`.

### The cause of the bug:
When using the `{something}` ICU interpolation, it is incorrectly parsed from messages file.

### Workaround
There is a hack to use ICU select expression with only single `other` clause, but this looks ugly and potentially might create problems with translators

```
`My {counter, selectordinal, =1 {} =2 {second} =3 {third} other {#th} } {title, select, other {{title}}} account`
```

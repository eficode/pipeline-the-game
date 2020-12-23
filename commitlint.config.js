const apps = ["all", "app", "functions", "firestore", "database"]
const scopes = [
    "config",
    "login",
    "signup",
    "dashboard",
    "board"
];
const _prefixed = scopes.map((s) => apps.map((p) => `${p}-${s}`));
const scopeEnum = [].concat.apply([], _prefixed);

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules:{
        "scope-empty": [2, "never"],
        "scope-enum": [2, "always", scopeEnum],
    }
}

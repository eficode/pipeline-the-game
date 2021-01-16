const apps = ["all", "app", "functions", "firestore", "database", "common"]
const scopes = [
    "config",
    "auth",
    "login",
    "signup",
    "dashboard",
    "board",
    "general",
    "rules",
    "release",
    "create-game",
    "components"
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

module.exports = function (api) {
    api.cache(false)
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module:react-native-dotenv",
                {
                    envName: "APP_ENV",
                    moduleName: "@env",
                    path: ".env",
                    blocklist: null,
                    allowlist: ["WEB_URL", "AND_URL"],
                },
            ],
        ],
    }
}

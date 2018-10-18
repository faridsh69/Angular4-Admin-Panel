export class AppSettings {
    public static API_URL = process.env.ENV === 'production' ? "https://panel.timchesara.com" : '/v1/';
    public static USERNAME = window['panelSettings'].username;
    public static STORE_NAME = window['panelSettings'].storeName;
    public static STORE_BASE_URL = window['panelSettings'].storeBaseUrl;
}
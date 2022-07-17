import {
	AuthenticationResult,
	EventMessage,
	EventType,
	PublicClientApplication,
} from "@azure/msal-browser";
import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { msalConfig } from "./auth";

export const msalInstance = new PublicClientApplication(msalConfig);

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
	msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
	if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
		const payload = event.payload as AuthenticationResult;
		const account = payload.account;
		msalInstance.setActiveAccount(account);
	}
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<App pca={msalInstance} />
		</BrowserRouter>
	</React.StrictMode>
);

/* eslint-disable react/prop-types */
import {
	Configuration,
	RedirectRequest,
	NavigationClient,
	NavigationOptions,
	IPublicClientApplication,
} from "@azure/msal-browser";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
	auth: {
		clientId: "5c007736-3695-4853-abca-ec803daa85a2",
		authority:
			"https://login.microsoftonline.com/08347458-bb6b-4b14-9325-3976ab9797eb",
		redirectUri: "/",
	},
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: RedirectRequest = {
	scopes: ["User.Read"],
};

// Add here the endpoints for MS Graph API services you would like to use.
// export const graphConfig = {
// 	graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me",
// };

type ClientSideNavigationProps = {
	pca: IPublicClientApplication;
	children: React.ReactNode;
};

export function ClientSideNavigation({
	pca,
	children,
}: ClientSideNavigationProps) {
	const navigate = useNavigate();
	const navigationClient = useMemo(
		() => new CustomNavigationClient(navigate),
		[navigate]
	);
	pca.setNavigationClient(navigationClient);

	// react-router-dom v6 doesn't allow navigation on the first render - delay rendering of MsalProvider to get around this limitation
	const [firstRender, setFirstRender] = useState(true);
	useEffect(() => {
		setFirstRender(false);
	}, []);

	if (firstRender) {
		return null;
	}

	return children;
}

/**
 * This is an example for overriding the default function MSAL uses to navigate to other urls in your webpage
 */
export class CustomNavigationClient extends NavigationClient {
	private navigate: NavigateFunction;
	constructor(navigate: NavigateFunction) {
		super();
		this.navigate = navigate;
	}

	/**
	 * Navigates to other pages within the same web application
	 * You can use the useNavigate hook provided by react-router-dom to take advantage of client-side routing
	 */
	async navigateInternal(url: string, options: NavigationOptions) {
		const relativePath = url.replace(window.location.origin, "");
		console.log(url);
		if (options.noHistory) {
			this.navigate(relativePath, { replace: true });
		} else {
			this.navigate(relativePath);
		}

		return false;
	}
}

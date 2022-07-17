import { InteractionType, IPublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { ClientSideNavigation, loginRequest } from "./auth";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { SignOutButton } from "./SignOutButton";

type AppProps = {
	pca: IPublicClientApplication;
};
function App({ pca }: AppProps) {
	return (
		// @ts-expect-error this error does not make sense
		<ClientSideNavigation pca={pca}>
			<MsalProvider instance={pca}>
				<Batata />
			</MsalProvider>
		</ClientSideNavigation>
	);
}

const Batata = () => (
	<MsalAuthenticationTemplate
		interactionType={InteractionType.Redirect}
		authenticationRequest={loginRequest}
		errorComponent={Error}
		loadingComponent={Loading}
	>
		<>
			<div>hello</div>
			<SignOutButton />
		</>
	</MsalAuthenticationTemplate>
);

const Error = () => <div>something went wrong</div>;

const Loading = () => <div>loading...</div>;

export default App;

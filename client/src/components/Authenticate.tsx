import { StytchB2B } from "@stytch/react/b2b";
import { AuthFlowType, B2BProducts, StytchB2BUIConfig, StytchEventType } from "@stytch/vanilla-js";
import { useNavigate } from "react-router-dom";

export const Authenticate = () => {
    const navigate = useNavigate();
    const config: StytchB2BUIConfig = {
        products: [B2BProducts.emailMagicLinks],
        sessionOptions: { sessionDurationMinutes: 60 },
        authFlowType: AuthFlowType.Discovery,
    };

  return (
    <div className="flex items-center justify-center h-screen">
        <StytchB2B 
            config={config}
            callbacks={{
                onEvent: async ({type, data}) => {
                    if (
                        type === StytchEventType.B2BDiscoveryIntermediateSessionExchange ||
                        type === StytchEventType.B2BDiscoveryOrganizationsCreate
                    ){
                        if(data && data.member){
                            const api = new URL("/api/users", import.meta.env.VITE_PUBLIC_API_URL);
                            return fetch(api, {
                                method: "POST",
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  member_id: data.member.member_id,
                                  name: data.member.name,
                                  email: data.member.email_address,
                                }),
                                credentials: "include",
                            }).then(res => (
                                res.json()
                            )).then(result => {
                                if(result.isNewUser){
                                    navigate("/profile/update")
                                }else {
                                    navigate("/")
                                }
                            })
                        }
                    }
                },
            }} 
        />
      </div>
  )
}

import { StytchB2B } from "@stytch/react/b2b";
import { AuthFlowType, B2BProducts, StytchB2BUIConfig } from "@stytch/vanilla-js";
import {useStytchMemberSession} from '@stytch/react/b2b'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const LoginOrSignup = () => {
  const { session, fromCache } = useStytchMemberSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session && fromCache) {
      navigate("/");
    }
  }, [fromCache, session, navigate]);

  const config: StytchB2BUIConfig = {
      products: [B2BProducts.emailMagicLinks],
      emailMagicLinksOptions: {
        discoveryRedirectURL: `${window.location.origin}/authenticate`
      },
      sessionOptions: { sessionDurationMinutes: 60 },
      authFlowType: AuthFlowType.Discovery,
  };
  
    return (
      <div className="flex items-center justify-center h-screen">
        <StytchB2B config={config} />
      </div>
    );
};
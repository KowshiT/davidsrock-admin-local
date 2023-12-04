import ModalOpenCloseContextProvider from "@/contexts/modalContext/modalOpenCloseContext";
import AuthCardControlContextProvider from "@/contexts/authContext/authCardControlContext";

import "@/styles/globals.scss";
import EventCreateStageContextProvider from "@/contexts/eventContext/eventCreateStageContext";
import OrganizationCreateStageContextProvider from "@/contexts/organizationContext/organizationCreateStageContext";
import AlertContextProvider from "@/contexts/alertContext/alertContext";
import CreateOrganizationContextProvider from "@/contexts/organizationContext/createOrganizationContext";
import CreateEventContextProvider from "@/contexts/createEventContext/createEventContext";
import SignUpStageContextProvider from "@/contexts/authContext/SignUpStageContext";
import PublicProfileCreateStageContextProvider from "@/contexts/publicProfileContext/createPublicProfileStageContext";
import CreatePublicProfileContextProvider from "@/contexts/publicProfileContext/createPublicProfileContext";
import ImageUploadDetailsContextProvider from "@/contexts/imageUploadContext/imageUploadContext";
import { UserProvider } from "@/contexts/authContext/userProvider";
import { WarningPopupProvider } from "@/contexts/modalContext/warningPopupProvider";
import { SuccessPopupProvider } from "@/contexts/modalContext/successPopupProvider";
import AdminPanelContextProvider from "@/contexts/adminPanelContext/adminPanelContext";
import { ModalProvider } from "@/contexts/modalContext/imageModalProvider";
import FollowContextProvider from "@/contexts/followContext/followContext";
import PostContextProvider from "@/contexts/postContext/postContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AlertContextProvider>
        <AuthCardControlContextProvider>
          <ModalProvider>
            <SuccessPopupProvider>
              <WarningPopupProvider>
                <UserProvider>
                  <ModalOpenCloseContextProvider>
                    <OrganizationCreateStageContextProvider>
                      <EventCreateStageContextProvider>
                        <CreateOrganizationContextProvider>
                          <CreateEventContextProvider>
                            <SignUpStageContextProvider>
                              <PublicProfileCreateStageContextProvider>
                                <CreatePublicProfileContextProvider>
                                  <ImageUploadDetailsContextProvider>
                                    <AdminPanelContextProvider>
                                      <FollowContextProvider>
                                        <PostContextProvider>
                                          <Component {...pageProps} />
                                        </PostContextProvider>
                                      </FollowContextProvider>
                                    </AdminPanelContextProvider>
                                  </ImageUploadDetailsContextProvider>
                                </CreatePublicProfileContextProvider>
                              </PublicProfileCreateStageContextProvider>
                            </SignUpStageContextProvider>
                          </CreateEventContextProvider>
                        </CreateOrganizationContextProvider>
                      </EventCreateStageContextProvider>
                    </OrganizationCreateStageContextProvider>
                  </ModalOpenCloseContextProvider>
                </UserProvider>
              </WarningPopupProvider>
            </SuccessPopupProvider>
          </ModalProvider>
        </AuthCardControlContextProvider>
      </AlertContextProvider>
    </>
  );
}

export default MyApp;

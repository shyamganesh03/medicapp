import { ProfileModule } from "./app-text-data";

export type ProfileMenuItemsProps = {
  icon_name: any;
  title: string;
  type: string;
  href?: string | undefined;
  isComingSoon?: boolean;
};

export const profileMenuItems: ProfileMenuItemsProps[] = [
  {
    icon_name: "",
    title: "",
    type: "theme-toggle",
    href: "",
  },
  {
    icon_name: "person",
    title: ProfileModule.OPTION_CARD_TITLE.EDIT_PROFILE,
    type: "edit-profile",
    href: "edit-profile",
  },
  // {
  //   icon_name: "payments",
  //   title: ProfileModule.OPTION_CARD_TITLE.PAYMENT_MANAGEMENT,
  //   type: "payment-management",
  //   href: "payment_management",
  // },
  {
    icon_name: "list-alt",
    title: ProfileModule.OPTION_CARD_TITLE.MY_ORDERS,
    type: "my-order-list",
    href: "",
    isComingSoon: true,
  },
  {
    icon_name: "trolley",
    title: ProfileModule.OPTION_CARD_TITLE.CART,
    type: "cart",
    href: "",
    isComingSoon: true,
  },
  // {
  //   icon_name: "favorite",
  //   title: ProfileModule.OPTION_CARD_TITLE.SAVED_PRODUCTS,
  //   type: "saved-products-list",
  //   href: "",
  // },

  {
    icon_name: "star-rate",
    title: ProfileModule.OPTION_CARD_TITLE.RATE_US,
    type: "rate-us",
    href: "",
    isComingSoon: true,
  },
  {
    icon_name: "logout",
    title: ProfileModule.OPTION_CARD_TITLE.SIGN_OUT,
    type: "sign-out",
    href: "",
  },
];

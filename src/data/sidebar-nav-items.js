export default function() {
  return [
    {
      title: "My Account Details",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    },
    {
      title: "Billing Details",
      htmlBefore: '<i class="material-icons">location_city</i>',
      to: "/billing-details",
    },
    {
      title: "Instructional Videos",
      htmlBefore: '<i class="material-icons">video_library</i>',
      to: "/instructional-videos",
    },
    {
      title: "Upload Documents",
      htmlBefore: '<i class="material-icons">cloud_upload</i>',
      to: "/upload-documents",
    },
    {
      title: "View Documents",
      htmlBefore: '<i class="material-icons">file_copy</i>',
      to: "/view-documents",
    },
    {
      title: "Change Password",
      htmlBefore: '<i class="material-icons">lock</i>',
      to: "/change-password",
    },
    {
      title: "My Orders",
      htmlBefore: '<i class="material-icons">shopping_cart</i>',
      to: "/my-orders",
    },
    {
      title: "Property Request Form",
      htmlBefore: '<i class="material-icons">shopping_cart</i>',
      to: "/property-request-form",
    }
  ];
}

import * as Yup from 'yup';
import {i18n} from '../../localization';

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

export const phoneValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(
      /^(06|07|08)\d{8}$/,
      'Please enter a valid South African mobile number (e.g., 06XXXXXXXX).',
    )
    .required(i18n.t('PhoneNumberIsRequired')),
});

export const onboardBusinessDetailsValidationSchema = Yup.object().shape({
  businessName: Yup.string()
    .required(i18n.t('BusinessNameIsRequired'))
    .min(2, i18n.t('BusinessNameMustBeAtLeastTwoCharacters'))
    .max(50, i18n.t('BusinessNameMustBeLessThanFiftyCharacters'))
    .matches(
      /^[a-zA-Z0-9 &'()]+$/,
      "Only letters, numbers, spaces, and & ' ( ) are allowed",
    ),

  CIPCRegistrationNumber: Yup.string()
    .required('CIPC Registration Number is required')
    .test(
      'is-valid-cipc-format',
      'Invalid format', // fallback message
      function (value) {
        if (!value) return true; // allow Yup to handle "required"

        const regexFull =
          /^\d{4}\/\d{6,7}\/(06|07|08|09|10|12|21|22|23|24|25|26|30|31)$/;

        if (!/^\d{4}\/\d{6,7}\/\d{2}$/.test(value)) {
          return this.createError({
            message: 'Expected format: XXXX/XXXXXX/XX',
          });
        }

        if (!regexFull.test(value)) {
          return this.createError({
            message: 'Invalid CIPC Registration Number',
          });
        }

        return true;
      },
    ),

  businessCategory_name: Yup.string().required(
    i18n.t('BusinessCategoryIsRequired'),
  ),

  businessLocation_name: Yup.string().required(i18n.t('LocationIsRequired')),

  termsAndConditionCheckBox: Yup.boolean().oneOf(
    [true],
    i18n.t('YouMustAcceptTheTermsAndConditions'),
  ),
});

export const onboardContactDetailsValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required(i18n.t('FirstNameIsRequired'))
    .matches(
      /^[A-Za-z][A-Za-z\s]*$/,
      i18n.t('NameMustStartWithALetterAndContainOnlyAlphabetsAndSpaces'),
    )
    .min(2, i18n.t('NameMustBeAtLeastTwoCharacters'))
    .max(50, i18n.t('NameMustBeLessThanFiftyCharacters')),

  lastName: Yup.string()
    .required(i18n.t('LastNameIsRequired'))
    .matches(
      /^[A-Za-z][A-Za-z\s]*$/,
      i18n.t('NameMustStartWithALetterAndContainOnlyAlphabetsAndSpaces'),
    )
    .min(2, i18n.t('NameMustBeAtLeastTwoCharacters'))
    .max(50, i18n.t('NameMustBeLessThanFiftyCharacters')),

  email: Yup.string()
    .required(i18n.t('EmailIsRequired'))
    .email(i18n.t('InvalidEmailAddress')),
});

export const onboardContactDetailsEmailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required(i18n.t('EmailIsRequired'))
    .email(i18n.t('InvalidEmailAddress')),
});

const isImageOrPdf = value => {
  const allowedTypes = ['application/pdf'];
  return (
    value &&
    (value.type?.startsWith('image/') ||
      allowedTypes.includes(value.type) ||
      value.name?.match(/\.(pdf|jpe?g|png|webp|heic|gif|bmp|tiff)$/i))
  );
};

export const onboardComplianceAndFinancialDetailsValidationSchema =
  Yup.object().shape({
    taxCertificate: Yup.mixed()
      .required(i18n.t('TradeLicensePhotoIsRequired'))
      .test('fileFormat', 'Only images or PDF allowed', isImageOrPdf)
      .test(
        'fileSize',
        'File too large (max 5MB)',
        value => !value || value.size <= FILE_SIZE_LIMIT,
      ),

    registerationCertificate: Yup.mixed()
      .required('Registration document is required')
      .test('fileFormat', 'Only images or PDF allowed', isImageOrPdf)
      .test(
        'fileSize',
        'File too large (max 5MB)',
        value => !value || value.size <= FILE_SIZE_LIMIT,
      ),
  });

export const businessProfileActivityDetailsValidationSchema =
  Yup.object().shape({
    businessName: Yup.string()
      .required('Business name is required')
      .min(2, 'Business name must be at least 2 characters')
      .max(50, 'Business name must be less than 50 characters'),

    businessType: Yup.string()
      .required('Business type is required')
      .min(2, 'Business type must be at least 2 characters')
      .max(50, 'Business type must be less than 50 characters'),

    // CIPCRegistrationNumber: Yup.string()
    //   .required('CIPC registration number is required')
    //   .matches(/^\d{4}\/\d{6}\/07$/, 'Format must be YYYY/NNNNNN/07'),

    zonkeBusinessCategory: Yup.string().required(
      'Zonke business category is required',
    ),

    // numberOfBranches: Yup.string().required('Number of branches is required'),

    // brandNameOfOutlets: Yup.string().required(
    //   'Brand name of outlets is required',
    // ),
  });

export const businessContactAddressDetailsValidationSchema = Yup.object().shape(
  {
    contactPersonFirstName: Yup.string()
      .required('Contact First Person Name is required')
      .matches(
        /^[A-Za-z][A-Za-z\s]*$/,
        'Name must start with a letter and contain only alphabets and spaces',
      )
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),

    contactPersonLastName: Yup.string()
      .required('Contact Last Person Name is required')
      .matches(
        /^[A-Za-z][A-Za-z\s]*$/,
        'Name must start with a letter and contain only alphabets and spaces',
      )
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),
  },
);

export const businessProfileComplianceAndFinancialsDetailsValidationSchema =
  Yup.object().shape({
    // registerationCertificate: Yup.mixed().required(
    //   'Registration Certificate is required',
    // ),
    // taxCertificate: Yup.mixed().required('Tax Certificate is required'),
    // CIPCRegistrationNumber: Yup.string()
    //   .required('CIPC Registration Number is required')
    // .test('is-valid-cipc-format', 'Invalid format', function (value) {
    //   if (!value) return true;
    //   const regexFull =
    //     /^\d{4}\/\d{6,7}\/(06|07|08|09|10|12|21|22|23|24|25|26|30|31)$/;
    //   if (!/^\d{4}\/\d{6,7}\/\d{2}$/.test(value)) {
    //     return this.createError({
    //       message: 'Expected format: XXXX/XXXXXX/XX',
    //     });
    //   }
    //   if (!regexFull.test(value)) {
    //     return this.createError({
    //       message: 'Invalid CIPC Registration Number',
    //     });
    //   }
    //   return true;
    // }),
    // registerationCertificate: Yup.mixed()
    //   .required('Registration Certificate is required')
    //   .test('fileFormat', 'Only images or PDF allowed', isImageOrPdf)
    //   .test('fileSize', 'File too large (max 5MB)', value => {
    //     if (!value) return true;
    //     if (typeof value === 'string') return true;
    //     return value.size <= FILE_SIZE_LIMIT;
    //   }),
    // taxNumber: Yup.string()
    //   .required('Tax Number is required')
    //   .matches(/^\d+$/, 'Tax Number must be a number'),
    // taxCertificate: Yup.mixed()
    //   .required('Tax Certificate is required')
    //   .test('fileFormat', 'Only images or PDF allowed', isImageOrPdf)
    //   .test('fileSize', 'File too large (max 5MB)', value => {
    //     if (!value) return true;
    //     if (typeof value === 'string') return true;
    //     return value.size <= FILE_SIZE_LIMIT;
    //   }),
  });

export const bankAccountDetailsValidationSchema = Yup.object().shape({
  bankProvince_name: Yup.string().required('Bank Province is required'),

  bankName_name: Yup.string().required('Bank Name is required'),

  bankAccountHolderName: Yup.string().required('Tax Number is required'),

  bankAccountNumber: Yup.string().required('Bank Account Number is required'),
});

export const outletInfoDetailsValidationSchema = Yup.object().shape({
  OutletName: Yup.string()
    .required(i18n.t('OutletNameIsRequired'))
    .min(2, i18n.t('OutletNameMustBeAtLeastTwoCharacters'))
    .max(50, i18n.t('OutletNameMustBeLessThanFiftyCharacters'))
    .matches(
      /^[a-zA-Z0-9 &'()]+$/,
      "Only letters, numbers, spaces, and & ' ( ) are allowed",
    ),

  ContactPersonFirstName: Yup.string()
    .required(i18n.t('ContactPersonNameIsRequired'))
    .matches(
      /^[A-Za-z][A-Za-z\s]*$/,
      i18n.t('NameMustStartWithALetterAndContainOnlyAlphabetsAndSpaces'),
    )
    .min(2, i18n.t('NameMustBeAtLeastTwoCharacters'))
    .max(50, i18n.t('NameMustBeLessThanFiftyCharacters')),

  ContactPersonLastName: Yup.string()
    .required(i18n.t('LastNameIsRequired'))
    .matches(
      /^[A-Za-z][A-Za-z\s]*$/,
      i18n.t('NameMustStartWithALetterAndContainOnlyAlphabetsAndSpaces'),
    )
    .min(2, i18n.t('NameMustBeAtLeastTwoCharacters'))
    .max(50, i18n.t('NameMustBeLessThanFiftyCharacters')),

  ContactPersonMobile: Yup.object().shape({
    mobileNo: Yup.string().required(i18n.t('PhoneNumberIsRequired')),
  }),

  ContactPersonEmail: Yup.string()
    .required(i18n.t('EmailIsRequired'))
    .email(i18n.t('InvalidEmailAddress')),

  MobileNumber_CustomerToReachOut: Yup.object().shape({
    mobileNo: Yup.string().required(i18n.t('PhoneNumberIsRequired')),
  }),

  SubCategories_id: Yup.string().required(i18n.t('SubcategoryRequired')),

  About: Yup.string().required(i18n.t('AboutISRequired')),

  // SubCategories_id: Yup.array()
  //   .min(1, i18n.t('AtLeastOneSubCategoryRequired'))
  //   .max(3, i18n.t('MaxThreeSubCategories')),

  OutletLocation: Yup.string().required(i18n.t('MapLocationIsRequired')),

  Address: Yup.string().required(i18n.t('AddressIsRequired')),

  Province_name: Yup.string().required(i18n.t('ProvinceIsRequired')),

  Area_name: Yup.string().required(i18n.t('AreaIsRequired')),
});

export const documentsDetailsValidationSchema = Yup.object().shape({
  RegistrationNo: Yup.string()
    .required(i18n.t('RegistrationNumberIsRequired'))
    .min(3, i18n.t('RegistrationNumberMustBeAtLeastThreeCharacters')),

  RegistrationDate: Yup.string().required(i18n.t('RegistrationDateIsRequired')),

  RegistrationCertificatePDF_JPG_PNG: Yup.mixed().required(
    i18n.t('RegistrationCertificateIsRequired'),
  ),

  TaxRegistrationNumber_TRN: Yup.string()
    .required(i18n.t('TaxNumberIsRequired'))
    .min(5, i18n.t('TaxNumberMustBeAtLeastFiveCharacters')),

  TaxRegistrationDate: Yup.string().required(
    i18n.t('TaxRegistrationDateIsRequired'),
  ),

  TaxCertificatePDF_JPG_PNG: Yup.mixed().required(
    i18n.t('TaxCertificateIsRequired'),
  ),
});

export const addMenuDetailsValidationSchema = Yup.object().shape({
  Outlet_name: Yup.string().required(i18n.t('OutletIsRequired')),

  ProductName: Yup.string()
    .required(i18n.t('ProductNameIsRequired'))
    .min(2, i18n.t('ProductNameMustBeAtLeastTwoCharacters'))
    .max(50, i18n.t('ProductNameMustBeLessThanFiftyCharacters'))
    .matches(
      /^[a-zA-Z0-9 &'()]+$/,
      "Only letters, numbers, spaces, and & ' ( ) are allowed",
    ),

  ProductType_name: Yup.string().required(i18n.t('ProductTypeIsRequired')),
  // .oneOf(['Veg', 'Non-Veg', 'Vegan'], 'Invalid menu type'), // optional choices

  Price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required')
    .positive('Price must be positive'),

  // Description: Yup.string().max(500, 'Description can be up to 500 characters'),

  // Photo: Yup.mixed()
  //   .nullable()
  //   .test('fileSize', 'File size is too large', value => {
  //     if (!value) return true;
  //     return value.size <= 5 * 1024 * 1024; // 5MB
  //   })
  //   .test('fileType', 'Unsupported file format', value => {
  //     if (!value) return true;
  //     return ['image/jpeg', 'image/png'].includes(value.type);
  //   }),
});

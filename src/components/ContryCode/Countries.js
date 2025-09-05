// Country data including name, ISO code, flag emoji, phone code and simple regex for validation
export const countries = [
  // A series
  {
    id: 1,
    name: 'Afghanistan',
    code: 'AF',
    flag: '🇦🇫',
    phoneCode: '+93',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 2,
    name: 'Albania',
    code: 'AL',
    flag: '🇦🇱',
    phoneCode: '+355',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 3,
    name: 'Algeria',
    code: 'DZ',
    flag: '🇩🇿',
    phoneCode: '+213',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 4,
    name: 'Andorra',
    code: 'AD',
    flag: '🇦🇩',
    phoneCode: '+376',
    phoneRegExp: '/^[0-9]{6}$/',
  },
  {
    id: 5,
    name: 'Angola',
    code: 'AO',
    flag: '🇦🇴',
    phoneCode: '+244',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 6,
    name: 'Antigua and Barbuda',
    code: 'AG',
    flag: '🇦🇬',
    phoneCode: '+1-268',
    phoneRegExp: '/^[0-9]{7}$/',
  },
  {
    id: 7,
    name: 'Argentina',
    code: 'AR',
    flag: '🇦🇷',
    phoneCode: '+54',
    phoneRegExp: '/^[0-9]{10}$/',
  },
  {
    id: 8,
    name: 'Armenia',
    code: 'AM',
    flag: '🇦🇲',
    phoneCode: '+374',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 9,
    name: 'Australia',
    code: 'AU',
    flag: '🇦🇺',
    phoneCode: '+61',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 10,
    name: 'Austria',
    code: 'AT',
    flag: '🇦🇹',
    phoneCode: '+43',
    phoneRegExp: '/^[0-9]{10,13}$/',
  },
  {
    id: 11,
    name: 'Azerbaijan',
    code: 'AZ',
    flag: '🇦🇿',
    phoneCode: '+994',
    phoneRegExp: '/^[0-9]{9}$/',
  },

  // B series
  {
    id: 12,
    name: 'Bahamas',
    code: 'BS',
    flag: '🇧🇸',
    phoneCode: '+1-242',
    phoneRegExp: '/^[0-9]{7}$/',
  },
  {
    id: 13,
    name: 'Bahrain',
    code: 'BH',
    flag: '🇧🇭',
    phoneCode: '+973',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 14,
    name: 'Bangladesh',
    code: 'BD',
    flag: '🇧🇩',
    phoneCode: '+880',
    phoneRegExp: '/^[0-9]{10}$/',
  },
  {
    id: 15,
    name: 'Barbados',
    code: 'BB',
    flag: '🇧🇧',
    phoneCode: '+1-246',
    phoneRegExp: '/^[0-9]{7}$/',
  },
  {
    id: 16,
    name: 'Belarus',
    code: 'BY',
    flag: '🇧🇾',
    phoneCode: '+375',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 17,
    name: 'Belgium',
    code: 'BE',
    flag: '🇧🇪',
    phoneCode: '+32',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 18,
    name: 'Belize',
    code: 'BZ',
    flag: '🇧🇿',
    phoneCode: '+501',
    phoneRegExp: '/^[0-9]{7}$/',
  },
  {
    id: 19,
    name: 'Benin',
    code: 'BJ',
    flag: '🇧🇯',
    phoneCode: '+229',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 20,
    name: 'Bhutan',
    code: 'BT',
    flag: '🇧🇹',
    phoneCode: '+975',
    phoneRegExp: '/^[0-9]{7,8}$/',
  },
  {
    id: 21,
    name: 'Bolivia',
    code: 'BO',
    flag: '🇧🇴',
    phoneCode: '+591',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 22,
    name: 'Bosnia and Herzegovina',
    code: 'BA',
    flag: '🇧🇦',
    phoneCode: '+387',
    phoneRegExp: '/^[0-9]{8,9}$/',
  },
  {
    id: 23,
    name: 'Botswana',
    code: 'BW',
    flag: '🇧🇼',
    phoneCode: '+267',
    phoneRegExp: '/^[0-9]{7,8}$/',
  },
  {
    id: 24,
    name: 'Brazil',
    code: 'BR',
    flag: '🇧🇷',
    phoneCode: '+55',
    phoneRegExp: '/^[0-9]{10,11}$/',
  },
  {
    id: 25,
    name: 'Brunei',
    code: 'BN',
    flag: '🇧🇳',
    phoneCode: '+673',
    phoneRegExp: '/^[0-9]{7}$/',
  },
  {
    id: 26,
    name: 'Bulgaria',
    code: 'BG',
    flag: '🇧🇬',
    phoneCode: '+359',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 27,
    name: 'Burkina Faso',
    code: 'BF',
    flag: '🇧🇫',
    phoneCode: '+226',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 28,
    name: 'Burundi',
    code: 'BI',
    flag: '🇧🇮',
    phoneCode: '+257',
    phoneRegExp: '/^[0-9]{8}$/',
  },

  // C series
  {
    id: 29,
    name: 'Cabo Verde',
    code: 'CV',
    flag: '🇨🇻',
    phoneCode: '+238',
    phoneRegExp: '/^[0-9]{7}$/',
  },
  {
    id: 30,
    name: 'Cambodia',
    code: 'KH',
    flag: '🇰🇭',
    phoneCode: '+855',
    phoneRegExp: '/^[0-9]{8,9}$/',
  },
  {
    id: 31,
    name: 'Cameroon',
    code: 'CM',
    flag: '🇨🇲',
    phoneCode: '+237',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 32,
    name: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    phoneCode: '+1',
    phoneRegExp: '/^[0-9]{10}$/',
  },
  {
    id: 33,
    name: 'Central African Republic',
    code: 'CF',
    flag: '🇨🇫',
    phoneCode: '+236',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 34,
    name: 'Chad',
    code: 'TD',
    flag: '🇹🇩',
    phoneCode: '+235',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 35,
    name: 'Chile',
    code: 'CL',
    flag: '🇨🇱',
    phoneCode: '+56',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 36,
    name: 'China',
    code: 'CN',
    flag: '🇨🇳',
    phoneCode: '+86',
    phoneRegExp: '/^[0-9]{11}$/',
  },
  {
    id: 37,
    name: 'Colombia',
    code: 'CO',
    flag: '🇨🇴',
    phoneCode: '+57',
    phoneRegExp: '/^[0-9]{10}$/',
  },
  {
    id: 38,
    name: 'Comoros',
    code: 'KM',
    flag: '🇰🇲',
    phoneCode: '+269',
    phoneRegExp: '/^[0-9]{7}$/',
  },
  {
    id: 39,
    name: 'Congo (Congo-Brazzaville)',
    code: 'CG',
    flag: '🇨🇬',
    phoneCode: '+242',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 40,
    name: 'Costa Rica',
    code: 'CR',
    flag: '🇨🇷',
    phoneCode: '+506',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 41,
    name: 'Croatia',
    code: 'HR',
    flag: '🇭🇷',
    phoneCode: '+385',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 42,
    name: 'Cuba',
    code: 'CU',
    flag: '🇨🇺',
    phoneCode: '+53',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 43,
    name: 'Cyprus',
    code: 'CY',
    flag: '🇨🇾',
    phoneCode: '+357',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 44,
    name: 'Czech Republic (Czechia)',
    code: 'CZ',
    flag: '🇨🇿',
    phoneCode: '+420',
    phoneRegExp: '/^[0-9]{9}$/',
  },

  // D series
  {
    id: 45,
    name: 'Democratic Republic of the Congo',
    code: 'CD',
    flag: '🇨🇩',
    phoneCode: '+243',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 46,
    name: 'Denmark',
    code: 'DK',
    flag: '🇩🇰',
    phoneCode: '+45',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 47,
    name: 'Djibouti',
    code: 'DJ',
    flag: '🇩🇯',
    phoneCode: '+253',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 48,
    name: 'Dominica',
    code: 'DM',
    flag: '🇩🇲',
    phoneCode: '+1-767',
    phoneRegExp: '/^[0-9]{7}$/',
  },
  {
    id: 49,
    name: 'Dominican Republic',
    code: 'DO',
    flag: '🇩🇴',
    phoneCode: '+1-809, +1-829, +1-849',
    phoneRegExp: '/^[0-9]{10}$/',
  },

  // E series
  {
    id: 50,
    name: 'Ecuador',
    code: 'EC',
    flag: '🇪🇨',
    phoneCode: '+593',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 51,
    name: 'Egypt',
    code: 'EG',
    flag: '🇪🇬',
    phoneCode: '+20',
    phoneRegExp: '/^[0-9]{10}$/',
  },
  {
    id: 52,
    name: 'El Salvador',
    code: 'SV',
    flag: '🇸🇻',
    phoneCode: '+503',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 53,
    name: 'Equatorial Guinea',
    code: 'GQ',
    flag: '🇬🇶',
    phoneCode: '+240',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 54,
    name: 'Eritrea',
    code: 'ER',
    flag: '🇪🇷',
    phoneCode: '+291',
    phoneRegExp: '/^[0-9]{7}$/',
  },
  {
    id: 55,
    name: 'Estonia',
    code: 'EE',
    flag: '🇪🇪',
    phoneCode: '+372',
    phoneRegExp: '/^[0-9]{7,8}$/',
  },
  {
    id: 56,
    name: 'Eswatini (fmr. "Swaziland")',
    code: 'SZ',
    flag: '🇸🇿',
    phoneCode: '+268',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 57,
    name: 'Ethiopia',
    code: 'ET',
    flag: '🇪🇹',
    phoneCode: '+251',
    phoneRegExp: '/^[0-9]{9}$/',
  },

  // F series
  {
    id: 58,
    name: 'Fiji',
    code: 'FJ',
    flag: '🇫🇯',
    phoneCode: '+679',
    phoneRegExp: '/^[0-9]{7}$/',
  },
  {
    id: 59,
    name: 'Finland',
    code: 'FI',
    flag: '🇫🇮',
    phoneCode: '+358',
    phoneRegExp: '/^[0-9]{9,10}$/',
  },
  {
    id: 60,
    name: 'France',
    code: 'FR',
    flag: '🇫🇷',
    phoneCode: '+33',
    phoneRegExp: '/^[0-9]{9}$/',
  },

  // G series
  {
    id: 61,
    name: 'Gabon',
    code: 'GA',
    flag: '🇬🇦',
    phoneCode: '+241',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 62,
    name: 'Gambia',
    code: 'GM',
    flag: '🇬🇲',
    phoneCode: '+220',
    phoneRegExp: '/^[0-9]{7}$/',
  },
  {
    id: 63,
    name: 'Georgia',
    code: 'GE',
    flag: '🇬🇪',
    phoneCode: '+995',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 64,
    name: 'Germany',
    code: 'DE',
    flag: '🇩🇪',
    phoneCode: '+49',
    phoneRegExp: '/^[0-9]{10,11}$/',
  },
  {
    id: 65,
    name: 'Ghana',
    code: 'GH',
    flag: '🇬🇭',
    phoneCode: '+233',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 66,
    name: 'Greece',
    code: 'GR',
    flag: '🇬🇷',
    phoneCode: '+30',
    phoneRegExp: '/^[0-9]{10}$/',
  },
  {
    id: 67,
    name: 'Grenada',
    code: 'GD',
    flag: '🇬🇩',
    phoneCode: '+1-473',
    phoneRegExp: '/^[0-9]{7}$/',
  },
  {
    id: 68,
    name: 'Guatemala',
    code: 'GT',
    flag: '🇬🇹',
    phoneCode: '+502',
    phoneRegExp: '/^[0-9]{8}$/',
  },
  {
    id: 69,
    name: 'Guinea',
    code: 'GN',
    flag: '🇬🇳',
    phoneCode: '+224',
    phoneRegExp: '/^[0-9]{9}$/',
  },
  {
    id: 70,
    name: 'Guinea-Bissau',
    code: 'GW',
    flag: '🇬🇼',
    phoneCode: '+245',
    phoneRegExp: '/^[0-9]{7}$/',
  },
  {
    id: 71,
    name: 'Guyana',
    code: 'GY',
    flag: '🇬🇾',
    phoneCode: '+592',
    phoneRegExp: '/^[0-9]{7}$/',
  },

  // H series
  {
    id: 72,
    name: 'Haiti',
    code: 'HT',
    flag: '🇭🇹',
    phoneCode: '+509',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 73,
    name: 'Honduras',
    code: 'HN',
    flag: '🇭🇳',
    phoneCode: '+504',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 74,
    name: 'Hungary',
    code: 'HU',
    flag: '🇭🇺',
    phoneCode: '+36',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },

  // I series
  {
    id: 75,
    name: 'Iceland',
    code: 'IS',
    flag: '🇮🇸',
    phoneCode: '+354',
    phoneRegExp: '/^d{7,8}$/', // 7 or 8 digits
  },
  {
    id: 76,
    name: 'India',
    code: 'IN',
    flag: '🇮🇳',
    phoneCode: '+91',
    phoneRegExp: '/^[6-9]d{9}$/', // 10 digits, starts with [6-9]
  },
  {
    id: 77,
    name: 'Indonesia',
    code: 'ID',
    flag: '🇮🇩',
    phoneCode: '+62',
    phoneRegExp: '/^d{9,12}$/', // 9 to 12 digits
  },
  {
    id: 78,
    name: 'Iran',
    code: 'IR',
    flag: '🇮🇷',
    phoneCode: '+98',
    phoneRegExp: '/^d{10,11}$/', // 10 or 11 digits
  },
  {
    id: 79,
    name: 'Iraq',
    code: 'IQ',
    flag: '🇮🇶',
    phoneCode: '+964',
    phoneRegExp: '/^d{10}$/', // 10 digits
  },
  {
    id: 80,
    name: 'Ireland',
    code: 'IE',
    flag: '🇮🇪',
    phoneCode: '+353',
    phoneRegExp: '/^d{7,9}$/', // 7 to 9 digits
  },
  {
    id: 81,
    name: 'Israel',
    code: 'IL',
    flag: '🇮🇱',
    phoneCode: '+972',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 82,
    name: 'Italy',
    code: 'IT',
    flag: '🇮🇹',
    phoneCode: '+39',
    phoneRegExp: '/^d{9,10}$/', // 9 or 10 digits
  },

  // J series
  {
    id: 83,
    name: 'Jamaica',
    code: 'JM',
    flag: '🇯🇲',
    phoneCode: '+1-876',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 84,
    name: 'Japan',
    code: 'JP',
    flag: '🇯🇵',
    phoneCode: '+81',
    phoneRegExp: '/^d{10}$/', // 10 digits
  },
  {
    id: 85,
    name: 'Jordan',
    code: 'JO',
    flag: '🇯🇴',
    phoneCode: '+962',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },

  // K series
  {
    id: 86,
    name: 'Kazakhstan',
    code: 'KZ',
    flag: '🇰🇿',
    phoneCode: '+7',
    phoneRegExp: '/^d{10}$/', // 10 digits
  },
  {
    id: 87,
    name: 'Kenya',
    code: 'KE',
    flag: '🇰🇪',
    phoneCode: '+254',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 88,
    name: 'Kiribati',
    code: 'KI',
    flag: '🇰🇮',
    phoneCode: '+686',
    phoneRegExp: '/^d{5,7}$/', // 5 to 7 digits
  },
  {
    id: 89,
    name: 'Korea, North',
    code: 'KP',
    flag: '🇰🇵',
    phoneCode: '+850',
    phoneRegExp: '/^d{7,8}$/', // 7 or 8 digits
  },
  {
    id: 90,
    name: 'Korea, South',
    code: 'KR',
    flag: '🇰🇷',
    phoneCode: '+82',
    phoneRegExp: '/^d{9,10}$/', // 9 or 10 digits
  },
  {
    id: 91,
    name: 'Kosovo',
    code: 'XK',
    flag: '🇽🇰',
    phoneCode: '+383',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 92,
    name: 'Kuwait',
    code: 'KW',
    flag: '🇰🇼',
    phoneCode: '+965',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 93,
    name: 'Kyrgyzstan',
    code: 'KG',
    flag: '🇰🇬',
    phoneCode: '+996',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },

  // L series
  {
    id: 94,
    name: 'Laos',
    code: 'LA',
    flag: '🇱🇦',
    phoneCode: '+856',
    phoneRegExp: '/^d{8,9}$/', // 8 or 9 digits
  },
  {
    id: 95,
    name: 'Latvia',
    code: 'LV',
    flag: '🇱🇻',
    phoneCode: '+371',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 96,
    name: 'Lebanon',
    code: 'LB',
    flag: '🇱🇧',
    phoneCode: '+961',
    phoneRegExp: '/^d{7,8}$/', // 7 or 8 digits
  },
  {
    id: 97,
    name: 'Lesotho',
    code: 'LS',
    flag: '🇱🇸',
    phoneCode: '+266',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 98,
    name: 'Liberia',
    code: 'LR',
    flag: '🇱🇷',
    phoneCode: '+231',
    phoneRegExp: '/^d{7,8}$/', // 7 or 8 digits
  },
  {
    id: 99,
    name: 'Libya',
    code: 'LY',
    flag: '🇱🇾',
    phoneCode: '+218',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 100,
    name: 'Liechtenstein',
    code: 'LI',
    flag: '🇱🇮',
    phoneCode: '+423',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 101,
    name: 'Lithuania',
    code: 'LT',
    flag: '🇱🇹',
    phoneCode: '+370',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 102,
    name: 'Luxembourg',
    code: 'LU',
    flag: '🇱🇺',
    phoneCode: '+352',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },

  // M series
  {
    id: 103,
    name: 'Madagascar',
    code: 'MG',
    flag: '🇲🇬',
    phoneCode: '+261',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 104,
    name: 'Malawi',
    code: 'MW',
    flag: '🇲🇼',
    phoneCode: '+265',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 105,
    name: 'Malaysia',
    code: 'MY',
    flag: '🇲🇾',
    phoneCode: '+60',
    phoneRegExp: '/^d{9,10}$/', // 9 or 10 digits
  },
  {
    id: 106,
    name: 'Maldives',
    code: 'MV',
    flag: '🇲🇻',
    phoneCode: '+960',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 107,
    name: 'Mali',
    code: 'ML',
    flag: '🇲🇱',
    phoneCode: '+223',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 108,
    name: 'Malta',
    code: 'MT',
    flag: '🇲🇹',
    phoneCode: '+356',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 109,
    name: 'Marshall Islands',
    code: 'MH',
    flag: '🇲🇭',
    phoneCode: '+692',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 110,
    name: 'Mauritania',
    code: 'MR',
    flag: '🇲🇷',
    phoneCode: '+222',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 111,
    name: 'Mauritius',
    code: 'MU',
    flag: '🇲🇺',
    phoneCode: '+230',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 112,
    name: 'Mexico',
    code: 'MX',
    flag: '🇲🇽',
    phoneCode: '+52',
    phoneRegExp: '/^d{10}$/', // 10 digits
  },
  {
    id: 113,
    name: 'Micronesia',
    code: 'FM',
    flag: '🇫🇲',
    phoneCode: '+691',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 114,
    name: 'Moldova',
    code: 'MD',
    flag: '🇲🇩',
    phoneCode: '+373',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 115,
    name: 'Monaco',
    code: 'MC',
    flag: '🇲🇨',
    phoneCode: '+377',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 116,
    name: 'Mongolia',
    code: 'MN',
    flag: '🇲🇳',
    phoneCode: '+976',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 117,
    name: 'Montenegro',
    code: 'ME',
    flag: '🇲🇪',
    phoneCode: '+382',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 118,
    name: 'Morocco',
    code: 'MA',
    flag: '🇲🇦',
    phoneCode: '+212',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 119,
    name: 'Mozambique',
    code: 'MZ',
    flag: '🇲🇿',
    phoneCode: '+258',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 120,
    name: 'Myanmar (formerly Burma)',
    code: 'MM',
    flag: '🇲🇲',
    phoneCode: '+95',
    phoneRegExp: '/^d{7,9}$/', // 7 to 9 digits
  },

  // N series
  {
    id: 121,
    name: 'Namibia',
    code: 'NA',
    flag: '🇳🇦',
    phoneCode: '+264',
    phoneRegExp: '/^d{7,9}$/', // 7 to 9 digits
  },
  {
    id: 122,
    name: 'Nauru',
    code: 'NR',
    flag: '🇳🇷',
    phoneCode: '+674',
    phoneRegExp: '/^d{5,7}$/', // 5 to 7 digits
  },
  {
    id: 123,
    name: 'Nepal',
    code: 'NP',
    flag: '🇳🇵',
    phoneCode: '+977',
    phoneRegExp: '/^d{10}$/', // 10 digits
  },
  {
    id: 124,
    name: 'Netherlands',
    code: 'NL',
    flag: '🇳🇱',
    phoneCode: '+31',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 125,
    name: 'New Zealand',
    code: 'NZ',
    flag: '🇳🇿',
    phoneCode: '+64',
    phoneRegExp: '/^d{8,9}$/', // 8 or 9 digits
  },
  {
    id: 126,
    name: 'Nicaragua',
    code: 'NI',
    flag: '🇳🇮',
    phoneCode: '+505',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 127,
    name: 'Niger',
    code: 'NE',
    flag: '🇳🇪',
    phoneCode: '+227',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 128,
    name: 'Nigeria',
    code: 'NG',
    flag: '🇳🇬',
    phoneCode: '+234',
    phoneRegExp: '/^d{10}$/', // 10 digits
  },
  {
    id: 129,
    name: 'North Macedonia (formerly Macedonia)',
    code: 'MK',
    flag: '🇲🇰',
    phoneCode: '+389',
    phoneRegExp: '/^d{8,9}$/', // 8 or 9 digits
  },
  {
    id: 130,
    name: 'Norway',
    code: 'NO',
    flag: '🇳🇴',
    phoneCode: '+47',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },

  // O series
  {
    id: 131,
    name: 'Oman',
    code: 'OM',
    flag: '🇴🇲',
    phoneCode: '+968',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },

  // P series
  {
    id: 132,
    name: 'Pakistan',
    code: 'PK',
    flag: '🇵🇰',
    phoneCode: '+92',
    phoneRegExp: '/^[3][0-9]d{9}$/', // 10 digits, starts with 3
  },
  {
    id: 133,
    name: 'Palau',
    code: 'PW',
    flag: '🇵🇼',
    phoneCode: '+680',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 134,
    name: 'Palestine State',
    code: 'PS',
    flag: '🇵🇸',
    phoneCode: '+970',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 135,
    name: 'Panama',
    code: 'PA',
    flag: '🇵🇦',
    phoneCode: '+507',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 136,
    name: 'Papua New Guinea',
    code: 'PG',
    flag: '🇵🇬',
    phoneCode: '+675',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 137,
    name: 'Paraguay',
    code: 'PY',
    flag: '🇵🇾',
    phoneCode: '+595',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 138,
    name: 'Peru',
    code: 'PE',
    flag: '🇵🇪',
    phoneCode: '+51',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 139,
    name: 'Philippines',
    code: 'PH',
    flag: '🇵🇭',
    phoneCode: '+63',
    phoneRegExp: '/^[9]d{9}$/', // 10 digits, starts with 9
  },
  {
    id: 140,
    name: 'Poland',
    code: 'PL',
    flag: '🇵🇱',
    phoneCode: '+48',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 141,
    name: 'Portugal',
    code: 'PT',
    flag: '🇵🇹',
    phoneCode: '+351',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },

  // Q series
  {
    id: 142,
    name: 'Qatar',
    code: 'QA',
    flag: '🇶🇦',
    phoneCode: '+974',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },

  // R series
  {
    id: 143,
    name: 'Romania',
    code: 'RO',
    flag: '🇷🇴',
    phoneCode: '+40',
    phoneRegExp: '/^d{10}$/', // 10 digits
  },
  {
    id: 144,
    name: 'Russia',
    code: 'RU',
    flag: '🇷🇺',
    phoneCode: '+7',
    phoneRegExp: '/^d{10}$/', // 10 digits
  },
  {
    id: 145,
    name: 'Rwanda',
    code: 'RW',
    flag: '🇷🇼',
    phoneCode: '+250',
    phoneRegExp: '/^d{10}$/', // 10 digits
  },

  // S series
  {
    id: 146,
    name: 'Saint Kitts and Nevis',
    code: 'KN',
    flag: '🇰🇳',
    phoneCode: '+1-869',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 147,
    name: 'Saint Lucia',
    code: 'LC',
    flag: '🇱🇨',
    phoneCode: '+1-758',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 148,
    name: 'Saint Vincent and the Grenadines',
    code: 'VC',
    flag: '🇻🇨',
    phoneCode: '+1-784',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 149,
    name: 'Samoa',
    code: 'WS',
    flag: '🇼🇸',
    phoneCode: '+685',
    phoneRegExp: '/^d{5,7}$/', // 5 to 7 digits
  },
  {
    id: 150,
    name: 'San Marino',
    code: 'SM',
    flag: '🇸🇲',
    phoneCode: '+378',
    phoneRegExp: '/^d{6,10}$/', // 6 to 10 digits (shares code with Italy)
  },
  {
    id: 151,
    name: 'Sao Tome and Principe',
    code: 'ST',
    flag: '🇸🇹',
    phoneCode: '+239',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 152,
    name: 'Saudi Arabia',
    code: 'SA',
    flag: '🇸🇦',
    phoneCode: '+966',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 153,
    name: 'Senegal',
    code: 'SN',
    flag: '🇸🇳',
    phoneCode: '+221',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 154,
    name: 'Serbia',
    code: 'RS',
    flag: '🇷🇸',
    phoneCode: '+381',
    phoneRegExp: '/^d{8,9}$/', // 8 or 9 digits
  },
  {
    id: 155,
    name: 'Seychelles',
    code: 'SC',
    flag: '🇸🇨',
    phoneCode: '+248',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 156,
    name: 'Sierra Leone',
    code: 'SL',
    flag: '🇸🇱',
    phoneCode: '+232',
    phoneRegExp: '/^d{7,8}$/', // 7 or 8 digits
  },
  {
    id: 157,
    name: 'Singapore',
    code: 'SG',
    flag: '🇸🇬',
    phoneCode: '+65',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 158,
    name: 'Slovakia',
    code: 'SK',
    flag: '🇸🇰',
    phoneCode: '+421',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 159,
    name: 'Slovenia',
    code: 'SI',
    flag: '🇸🇮',
    phoneCode: '+386',
    phoneRegExp: '/^d{8,9}$/', // 8 or 9 digits
  },
  {
    id: 160,
    name: 'Solomon Islands',
    code: 'SB',
    flag: '🇸🇧',
    phoneCode: '+677',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 161,
    name: 'Somalia',
    code: 'SO',
    flag: '🇸🇴',
    phoneCode: '+252',
    phoneRegExp: '/^d{7,9}$/', // 7 to 9 digits
  },
  {
    id: 162,
    name: 'South Africa',
    code: 'ZA',
    flag: '🇿🇦',
    phoneCode: '+27',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 163,
    name: 'South Sudan',
    code: 'SS',
    flag: '🇸🇸',
    phoneCode: '+211',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 164,
    name: 'Spain',
    code: 'ES',
    flag: '🇪🇸',
    phoneCode: '+34',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 165,
    name: 'Sri Lanka',
    code: 'LK',
    flag: '🇱🇰',
    phoneCode: '+94',
    phoneRegExp: '/^d{9,10}$/', // 9 or 10 digits
  },
  {
    id: 166,
    name: 'Sudan',
    code: 'SD',
    flag: '🇸🇩',
    phoneCode: '+249',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 167,
    name: 'Suriname',
    code: 'SR',
    flag: '🇸🇷',
    phoneCode: '+597',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 168,
    name: 'Sweden',
    code: 'SE',
    flag: '🇸🇪',
    phoneCode: '+46',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 169,
    name: 'Switzerland',
    code: 'CH',
    flag: '🇨🇭',
    phoneCode: '+41',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 170,
    name: 'Syria',
    code: 'SY',
    flag: '🇸🇾',
    phoneCode: '+963',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },

  // T series
  {
    id: 171,
    name: 'Taiwan',
    code: 'TW',
    flag: '🇹🇼',
    phoneCode: '+886',
    phoneRegExp: '/^d{9,10}$/', // 9 or 10 digits
  },
  {
    id: 172,
    name: 'Tajikistan',
    code: 'TJ',
    flag: '🇹🇯',
    phoneCode: '+992',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 173,
    name: 'Tanzania',
    code: 'TZ',
    flag: '🇹🇿',
    phoneCode: '+255',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 174,
    name: 'Thailand',
    code: 'TH',
    flag: '🇹🇭',
    phoneCode: '+66',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 175,
    name: 'Timor-Leste',
    code: 'TL',
    flag: '🇹🇱',
    phoneCode: '+670',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 176,
    name: 'Togo',
    code: 'TG',
    flag: '🇹🇬',
    phoneCode: '+228',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 177,
    name: 'Tonga',
    code: 'TO',
    flag: '🇹🇴',
    phoneCode: '+676',
    phoneRegExp: '/^d{6,7}$/', // 6 or 7 digits
  },
  {
    id: 178,
    name: 'Trinidad and Tobago',
    code: 'TT',
    flag: '🇹🇹',
    phoneCode: '+1-868',
    phoneRegExp: '/^d{7}$/', // 7 digits
  },
  {
    id: 179,
    name: 'Tunisia',
    code: 'TN',
    flag: '🇹🇳',
    phoneCode: '+216',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 180,
    name: 'Turkey',
    code: 'TR',
    flag: '🇹🇷',
    phoneCode: '+90',
    phoneRegExp: '/^d{10}$/', // 10 digits
  },
  {
    id: 181,
    name: 'Turkmenistan',
    code: 'TM',
    flag: '🇹🇲',
    phoneCode: '+993',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 182,
    name: 'Tuvalu',
    code: 'TV',
    flag: '🇹🇻',
    phoneCode: '+688',
    phoneRegExp: '/^d{5}$/', // 5 digits
  },

  // U series
  {
    id: 183,
    name: 'Uganda',
    code: 'UG',
    flag: '🇺🇬',
    phoneCode: '+256',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 184,
    name: 'Ukraine',
    code: 'UA',
    flag: '🇺🇦',
    phoneCode: '+380',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 185,
    name: 'United Arab Emirates',
    code: 'AE',
    flag: '🇦🇪',
    phoneCode: '+971',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 186,
    name: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    phoneCode: '+44',
    phoneRegExp: '/^d{10}$/', // 10 digits (rough estimate)
  },
  {
    id: 187,
    name: 'United States of America',
    code: 'US',
    flag: '🇺🇸',
    phoneCode: '+1',
    phoneRegExp: '/^d{10}$/', // 10 digits
  },
  {
    id: 188,
    name: 'Uruguay',
    code: 'UY',
    flag: '🇺🇾',
    phoneCode: '+598',
    phoneRegExp: '/^d{8}$/', // 8 digits
  },
  {
    id: 189,
    name: 'Uzbekistan',
    code: 'UZ',
    flag: '🇺🇿',
    phoneCode: '+998',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },

  // V series
  {
    id: 190,
    name: 'Vanuatu',
    code: 'VU',
    flag: '🇻🇺',
    phoneCode: '+678',
    phoneRegExp: '/^d{6,7}$/', // 6 or 7 digits
  },
  {
    id: 191,
    name: 'Vatican City',
    code: 'VA',
    flag: '🇻🇦',
    phoneCode: '+379',
    phoneRegExp: '/^d{6,10}$/', // 6 to 10 digits (shares with Italy)
  },
  {
    id: 192,
    name: 'Venezuela',
    code: 'VE',
    flag: '🇻🇪',
    phoneCode: '+58',
    phoneRegExp: '/^d{10}$/', // 10 digits
  },
  {
    id: 193,
    name: 'Vietnam',
    code: 'VN',
    flag: '🇻🇳',
    phoneCode: '+84',
    phoneRegExp: '/^d{9,10}$/', // 9 or 10 digits
  },

  // Y series
  {
    id: 194,
    name: 'Yemen',
    code: 'YE',
    flag: '🇾🇪',
    phoneCode: '+967',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },

  // Z series
  {
    id: 195,
    name: 'Zambia',
    code: 'ZM',
    flag: '🇿🇲',
    phoneCode: '+260',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
  {
    id: 196,
    name: 'Zimbabwe',
    code: 'ZW',
    flag: '🇿🇼',
    phoneCode: '+263',
    phoneRegExp: '/^d{9}$/', // 9 digits
  },
];

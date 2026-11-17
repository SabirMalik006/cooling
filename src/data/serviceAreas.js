/**
 * Service-area configuration.
 *
 * status values
 *  - 'hq'        : business location, always accurate
 *  - 'confirmed' : coverage explicitly confirmed by the business
 *  - 'pending'   : area is listed for confirmation — never presented as served
 *
 * Nothing in this file should be marked 'confirmed' until the client approves it.
 */

export const hq = {
  city: 'Millersville',
  state: 'Maryland',
  stateAbbr: 'MD',
  postalCode: '21108',
  line1: '690 Paddle Wheel Ct W',
  line2: 'Millersville, MD 21108',
  country: 'United States',
  label: 'Headquarters',
  note: 'Anne Arundel County, Maryland — the anchor point for ISO Mechanical.',
};

export const states = [
  {
    name: 'Maryland',
    abbr: 'MD',
    status: 'hq',
    cities: ['Millersville'],
    note: 'Business location. Extended coverage is confirmed per request.',
  },
];

export const communities = [
  { name: 'Millersville', status: 'hq' },
  { name: 'Severna Park', status: 'pending' },
  { name: 'Arnold', status: 'pending' },
  { name: 'Annapolis', status: 'pending' },
  { name: 'Gambrills', status: 'pending' },
  { name: 'Odenton', status: 'pending' },
  { name: 'Crofton', status: 'pending' },
  { name: 'Pasadena', status: 'pending' },
  { name: 'Glen Burnie', status: 'pending' },
  { name: 'Linthicum', status: 'pending' },
  { name: 'Severn', status: 'pending' },
  { name: 'Bowie', status: 'pending' },
];

/**
 * Full coverage list — towns, cities and communities we take service requests for.
 * Kept as one comma-separated block so it is easy to paste an updated list.
 */
const RAW_SERVICE_AREAS = `Millersville,Severn,Glen Burnie,Severna Park,Baltimore,Harmans,Crownsville,Pasadena,Odenton,Gambrills,Hanover,Linthicum Heights,Curtis Bay,Annapolis,Crofton,Fort George G Meade,Brooklyn,Annapolis Junction,Elkridge,Arnold,Jessup,Halethorpe,Laurel,Savage,Bowie,Gibson Island,Riva,Southern Md Facility,Fort Howard,Columbia,Pikesville,Dundalk,Catonsville,Davidsonville,Ellicott City,Glenn Dale,Sparrows Point,Edgewater,Simpsonville,Greenbelt,Beltsville,Gwynn Oak,Burtonsville,Capitol Heights,Lanham,Essex,Fulton,Mayo,Harwood,Upper Marlboro,Rosedale,Windsor Mill,College Park,Spencerville,Clarksville,Riverdale,Hyattsville,Highland,West River,Silver Spring,Galesville,Towson,Ashton,Middle River,Woodstock,Bladensburg,Parkville,Stevensville,Riderwood,Nottingham,Shady Side,Randallstown,Brinklow,Lutherville Timonium,Brentwood,Brooklandville,Stevenson,Sandy Spring,Marriottsville,Mount Rainier,Lothian,Rock Hall,Churchton,Dayton,Chester,Chase,Takoma Park,West Friendship,Washington,Deale,Perry Hall,District Heights,White Marsh,Suburb Maryland Fac,Glenelg,Owings Mills,Parcel Return Service,Olney,Brookeville,Glen Arm,Lisbon,Glenwood,Suitland,Tracys Landing,Kensington,Gunpowder,Cooksville,Andrews Air Force Base,Rockville,Long Green,Garrett Park,Upper Falls,Kingsville,Washington Navy Yard,Hunt Valley,Grasonville,Chevy Chase,Bethesda,Cockeysville,Friendship,Dunkirk,Hydes,Sykesville,Fork,Temple Hills,Glyndon,Phoenix,Naval Anacost Annex,Reisterstown,Joppa,Derwood,Claiborne,North Beach,Cheltenham,Mcdaniel,Woodbine,Fort Washington,Arlington,Edgewood,Gaithersburg,Baldwin,Wittman,Fort Myer,Oxon Hill,Queenstown,Washington Grove,Glen Echo,Owings,Butler,Benson,Clinton,Sherwood,Finksburg,Sparks Glencoe,Chestertown,Cabin John,Alexandria,Saint Michaels,Boring,Fallston,Montgomery Village,Abingdon,Mc Lean,Worton,Sunderland,Bozman,Chesapeake Beach,Potomac,Monkton,West Mclean,Wye Mills,Belcamp,Centreville,Neavitt,Bel Air,Upperco,Tilghman,Falls Church,Germantown,Perryman,Mount Airy,Brandywine,Greenway,Damascus,Betterton,Still Pond,Price,Newcomb,Forest Hill,Huntingtown,Aberdeen,Dunn Loring,Church Hill,Jarrettsville,Westminster,Queen Anne,Merrifield,Royal Oak,Vienna,Aberdeen Proving Ground,Hampstead,Annandale,Fairfax,Clarksburg,Parkton,Waldorf,Aquasco,Boyds,Accokeek,Great Falls,Monrovia,Mount Vernon,Springfield,New Windsor,Churchville,White Hall,Kennedyville,Cordova,Easton,Crumpton,Unionville,Street,Hillsboro,Reston,Ijamsville,Barnesville,Newington,Freeland,Havre De Grace,Fort Belvoir,Oxford,New Market,Bryans Road,Ingleside,Oakton,Manchester,Barstow,Sterling,Ridgely,Burke,Chantilly,White Plains,Sudlersville,Herndon,Millington,Maryland Line,Benedict,Bryantown,Pylesville,Union Bridge,Hughesville,Libertytown,Prince Frederick,Barclay,Poolesville,Pomfret,Dulles,Bealsville,Perry Point,Dickerson,Lineboro,Lorton,Darlington,Galena,Frederick,Earleville,Georgetown,Henderson,Whiteford,Fairfax Station,Trappe,Perryville,Port Republic,Goldsboro,Railroad,Bethlehem,Occoquan,Shrewsbury,Adamstown,Stewartstown,Preston,Cecilton,La Plata,New Park,Fawn Grove,Greensboro,Marydel,New Freedom,Massey,Buckeystown,Woodbridge,Ashburn,Glenville,Conowingo,Templeville,Walkersville,Denton,Port Deposit,Woodsboro,Indian Head,Ladiesburg,Keymar,Glen Rock,Clifton,Charlestown,Marbury,New Midway,Saint Leonard,Colora,Taneytown,Mechanicsville,Charlotte Hall,Delta,Leesburg,Madison,Woolford,Tuscarora,Port Tobacco,North East,Warwick,Bel Alton,Broomes Island,Taylors Island,Rising Sun,Chesapeake City,Point Of Rocks,Codorus,Manassas,Airville,Faulkner,Hartly,Secretary,Peach Bottom,Loganville,Clayton,Rocky Ridge,Morganza,Braddock Heights,Cambridge,Lusby,Littlestown,Felton,Seven Valleys,Drumore,Dumfries,Kenton,Paeonian Springs,Mc Sherrystown,East New Market,Spring Grove,Hurlock,Federalsburg,Loveville,Welcome,Hollywood,Dallastown,Brogue,Jefferson,York,Dhs,Aldie,Elkton,Catharpin,Waterford,Thurmont,Emmitsburg,Red Lion,Holtwood,Church Creek,Clements,Quantico,Camden Wyoming,Mount Victoria,Dowell,Childs,Lovettsville,Linkwood,Dover,Chaptico,Solomons,Brunswick,Hamilton,Middletown,York New Salem,Bristow,Townsend,Cheswold,Viola,Harrington,Windsor,Nanjemoy,Woodside,Haymarket,Pequea,Odessa,Abbottstown,Lincoln,Gainesville,Elk Mills,Burkittsville,California,Newburg,Bushwood,Triangle,Nokesville,Conestoga,Rhodesdale,Purcellville,Quarryville,Dahlgren,Myersville,Knoxville,Craley,Thomasville,Lewisville,Compton,Brownsville,Patuxent River,Greenwood,Rohrersville,Great Mills,New Oxford,Avenue,Leonardtown,Kirkwood,New Providence,Smyrna,Sabillasville,Rock Point,East Prospect,Bear,Abell,Gettysburg,Philomont,Middleburg,Cobb Island,Newark,Saint Georges,Fairfield,Lincoln University,Wrightsville,Magnolia,New London,New Castle,Lexington Park,Garrisonville,Callaway,Refton,Washington Boro,Round Hill,Kemblesville,Issue,Houston,Cascade,Bridgeville,Fishing Creek,Harpers Ferry,Keedysville,Willow Street`;

/** Full coverage list, in the order supplied. */
export const serviceAreas = Array.from(
  new Set(
    RAW_SERVICE_AREAS.split(',')
      .map((area) => area.trim())
      .filter(Boolean),
  ),
);

/** Same list sorted A–Z for browseable layouts. */
export const serviceAreasSorted = [...serviceAreas].sort((a, b) =>
  a.localeCompare(b, 'en', { sensitivity: 'base' }),
);

export const serviceAreaCount = serviceAreas.length;

export const coverageRegions = [
  { label: 'Maryland', note: 'Anne Arundel, Baltimore, Howard, PG & beyond' },
  { label: 'Washington, DC', note: 'District-wide residential & light commercial' },
  { label: 'Northern Virginia', note: 'Alexandria, Arlington, Fairfax & Loudoun' },
  { label: 'Delaware', note: 'New Castle, Kent & Sussex counties' },
  { label: 'Pennsylvania', note: 'York, Adams & Lancaster county line' },
];

export const coverageNote =
  'Coverage outside our Millersville base is confirmed for each request — tell us your ZIP code and we will let you know.';

export const coverageLead = `From our Millersville base we take heating and cooling requests across ${coverageRegions.length} regions and ${serviceAreaCount}+ named communities. Find your town below, or send your ZIP and we will confirm coverage.`;

export default {
  hq,
  states,
  communities,
  serviceAreas,
  serviceAreasSorted,
  serviceAreaCount,
  coverageRegions,
  coverageNote,
  coverageLead,
};

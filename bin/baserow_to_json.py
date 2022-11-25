from urllib.request import Request, urlopen
import math
import json
import time

api_key = 'jk9y8Ms1CRYCIGD6pGdAFRkMZKiuIY9g'

#coordinates from the street geojson
coordinates = [ [-118.3923, 34.090472998862033], [-118.392069001281897, 34.090585998770521], [-118.391937001514165, 34.090607999328853], [-118.391426000858601, 34.090620998548793], [-118.391042000706761, 34.090617998781354], [-118.390394001733682, 34.090604999591115], [-118.389750001306382, 34.09061899965581], [-118.389168001217016, 34.090624999453041], [-118.388553001512079, 34.090635998652708], [-118.388070001623902, 34.090630999038126], [-118.387628000561094, 34.090642999397687], [-118.386654000799936, 34.090639998975533], [-118.386559000687654, 34.09064099939669], [-118.385973000638899, 34.090643998459093], [-118.385512000969356, 34.090639998844296], [-118.384433000634004, 34.090633999414834], [-118.383678001204842, 34.090642999293891], [-118.38329500112529, 34.090728998629345], [-118.38310047307175, 34.09082240884117], [-118.382981473161962, 34.090885408004425], [-118.382832635252669, 34.090981092836628], [-118.382496791949606, 34.091218833782996], [-118.382243983195764, 34.091358936974373], [-118.381972699420544, 34.091471426801235], [-118.38166534948806, 34.091593166476123], [-118.381373617391262, 34.091677457399001], [-118.381072247955004, 34.09178081782197], [-118.380490248074764, 34.09200281915345], [-118.379567000522556, 34.092425998851127], [-118.378968631476184, 34.092721637269563], [-118.378875832262551, 34.092748730082839], [-118.378286001861426, 34.093120998424297], [-118.377743000621379, 34.093479999378992], [-118.376396000467153, 34.094342999412682], [-118.376329818977084, 34.094372809916756], [-118.376285000381628, 34.094392999481045], [-118.376257001483381, 34.094402998407155], [-118.375665001408265, 34.094563999422434], [-118.37531200180743, 34.094648999368616], [-118.375141000737926, 34.094690999308739], [-118.374720697607628, 34.094782291392583], [-118.374676000552938, 34.094791998450781], [-118.373895000981008, 34.094965998396589], [-118.373196000461547, 34.095124999766817], [-118.372702000791691, 34.095239999496265], [-118.372271001450798, 34.095395999036008], [-118.371851000614825, 34.095698998648835], [-118.371627000703214, 34.095903998878455], [-118.371484001783656, 34.096005999727794], [-118.371325001412231, 34.096106998618353], [-118.370919000853164, 34.096296999045791], [-118.370332001698785, 34.096512998505055], [-118.369927000954888, 34.09669599874141], [-118.369763000399189, 34.096785998940831], [-118.369382001853012, 34.096996998910186], [-118.36890100106136, 34.097331999154896], [-118.368676000833887, 34.097502998801943], [-118.368519000761253, 34.09761299918388], [-118.368301001404873, 34.097764998877658], [-118.36818400089841, 34.097838999107317], [-118.368144000290854, 34.097864998409719], [-118.368102000970239, 34.097882998432141], [-118.36799000118819, 34.097918999301861], [-118.367973001328039, 34.097923999201548], [-118.367838001172089, 34.097949999265282], [-118.367709000274274, 34.097959999754366], [-118.367444000942569, 34.097963999632483], [-118.367141001457085, 34.097968999352531], [-118.366719000351637, 34.097974999698721], [-118.366453001436142, 34.097978999030055], [-118.365622001886791, 34.097991999435528], [-118.3653460011475, 34.097995998456327], [-118.365039001772828, 34.098000999371216], [-118.364464000897613, 34.098009999096114], [-118.364280000818624, 34.098011998881596], [-118.363010001823838, 34.098031999260726], [-118.362860001464455, 34.098033998842119], [-118.362216000339785, 34.0980439984152], [-118.361556000367173, 34.098053998816226], [-118.360994000742807, 34.098062999397172], [-118.360360001549964, 34.098069999041492], [-118.359270001760052, 34.098065999382449], [-118.358179001604796, 34.098058998938576], [-118.357089000287019, 34.098050999443956], [-118.356103001022305, 34.098044999428154], [-118.355013001854758, 34.098036999490319], [-118.353923000400783, 34.098029998485501], [-118.352832001372491, 34.098022999002715], [-118.351742001238563, 34.098014999106482], [-118.350997000654274, 34.098009998775396], [-118.350655000653248, 34.098007999279808], [-118.350034001070824, 34.098003999195235], [-118.349561001333299, 34.097999999757263], [-118.348957001761917, 34.097995998416835], [-118.348345001230527, 34.097991998834559], [-118.347866000399478, 34.097988999124446], [-118.34706600030583, 34.097982998916756], [-118.346776001372191, 34.097980999449923], [-118.346258001767268, 34.097977999768304], [-118.345567001782328, 34.097972999721208], [-118.345197001035061, 34.097970998732265], [-118.344119001608917, 34.097962998490459], [-118.342502001798479, 34.097965998919506], [-118.341558001321147, 34.097967998646283], [-118.341370001558488, 34.097967999539435], [-118.340484000524611, 34.097969998639542], [-118.338658001344641, 34.097972998953431], [-118.338021000702554, 34.09797399903654], [-118.337558001813832, 34.097974999377314], [-118.336582000522952, 34.097976998975589], [-118.336310000915446, 34.097976999448349], [-118.335284001191667, 34.097978999688273], [-118.333791001173793, 34.097981999446382], [-118.333211000467884, 34.097982999590336], [-118.33245600189872, 34.097983998827999], [-118.332198000307713, 34.097983999362533], [-118.331560000728658, 34.0979859993978], [-118.331013000254444, 34.097986999728086], [-118.330283000885558, 34.097987998498773], [-118.329509001764023, 34.097988998899623], [-118.328810000268376, 34.097989998495045], [-118.327746001051906, 34.097991998735203], [-118.326655001932778, 34.097993999291837], [-118.325148001722127, 34.098002999529463], [-118.323719000757933, 34.098011998532918], [-118.322292001930464, 34.098020999212061], [-118.321517001577135, 34.098025998779896], [-118.321186000520626, 34.098027999016857], [-118.320540000438328, 34.098031999340975], [-118.320111001917923, 34.098034999420527], [-118.319709001137909, 34.09803699938692], [-118.319054000411967, 34.09804099869833], [-118.317958000297807, 34.098047998820661], [-118.315777000847262, 34.098061999579819], [-118.314760000631367, 34.098067998841294], [-118.314638001699606, 34.098068998946772], [-118.314596000908665, 34.098068998572032], [-118.314491001853142, 34.098069999286615], [-118.314374000390686, 34.098070998780024], [-118.314248001402518, 34.098070998734812], [-118.314028001554448, 34.098072998731368], [-118.313613000321439, 34.098074999540231], [-118.311442001448171, 34.098088998793592], [-118.310960000419371, 34.098091998876356], [-118.309239001225521, 34.098102998736792], [-118.307063001104751, 34.098107999609454], [-118.305622001625167, 34.098110998883605], [-118.30434000164361, 34.098114998755698], [-118.303144001696822, 34.098116999391856], [-118.302151001029998, 34.098119998780426], [-118.300515001871844, 34.098123998644873], [-118.299419000640626, 34.098126999574099], [-118.298324000735334, 34.098130999660036], [-118.297228001263491, 34.098134999315661], [-118.296121000506162, 34.098138999108819], [-118.295023001758253, 34.098141998823259], [-118.293928001586011, 34.098145998463572], [-118.29287200185108, 34.098148998856551], [-118.291758000991848, 34.098152999560426], [-118.289578001664538, 34.098157999086695], [-118.288762083395696, 34.098159451540042], [-118.288468738393263, 34.09815564569579], [-118.2881235, 34.0981572], [-118.2877486, 34.0981588], [-118.2873996, 34.0981587], [-118.2871076, 34.0981552], [-118.2867747, 34.0979333], [-118.2867277, 34.0979024], [-118.2865911, 34.0978127], [-118.2864467, 34.0977179], [-118.2862326, 34.0975823], [-118.2860302, 34.0974424], [-118.285781, 34.0972571], [-118.2854477, 34.0969675], [-118.2853596, 34.096891], [-118.285051, 34.0966229], [-118.2845899, 34.0962223], [-118.2841304, 34.0958188], [-118.2839595, 34.0956639], [-118.2837101, 34.0954378], [-118.2836584, 34.095391], [-118.2836166, 34.0953567], [-118.2834134, 34.0951672], [-118.2833277, 34.095091], [-118.2831219, 34.0949065], [-118.2830325, 34.0948238], [-118.282965, 34.0947626], [-118.2828097, 34.0946218], [-118.2824369, 34.0942871], [-118.2820089, 34.093908], [-118.2816864, 34.0936226], [-118.2811333, 34.0931227], [-118.2809051, 34.092918], [-118.2807473, 34.0927759], [-118.280386, 34.0924515], [-118.2801184, 34.092175], [-118.2799977, 34.0920504], [-118.2798378, 34.0918854], [-118.2796339, 34.0916749], [-118.2794493, 34.091467], [-118.2793678, 34.091385], [-118.2791286, 34.0911442], [-118.2789012, 34.0909875], [-118.2787987, 34.0909445], [-118.2785286, 34.0908313], [-118.2783128, 34.0907409], [-118.2782777, 34.0907262], [-118.2781421, 34.0906694], [-118.2780931, 34.0906489], [-118.2777605, 34.0905095], [-118.2774973, 34.0903607], [-118.2773339, 34.0902411], [-118.2772386, 34.0901541], [-118.2771613, 34.090074], [-118.2771067, 34.0900048], [-118.277074, 34.0899656], [-118.2770489, 34.0899336], [-118.2769958, 34.0898681], [-118.2769144, 34.0897654], [-118.2767561, 34.0894575], [-118.2766962, 34.0893403], [-118.2766294, 34.0891782], [-118.2765911, 34.0890853], [-118.2764592, 34.0887655], [-118.276339, 34.0885165], [-118.2761401, 34.0881075], [-118.2760669, 34.087957], [-118.2759029, 34.0876067], [-118.2758634, 34.0875211], [-118.2755387, 34.0868286], [-118.2752904, 34.086299], [-118.2750031, 34.0857058], [-118.2748445, 34.0853773], [-118.2747561, 34.0852063], [-118.2746793, 34.0850598], [-118.2745546, 34.0848222], [-118.2744917, 34.0846784], [-118.2744374, 34.0845543], [-118.2743059, 34.0842536], [-118.2740987, 34.0838683], [-118.2739197, 34.0835356], [-118.2737652, 34.0833508], [-118.2735981, 34.0831816], [-118.2735334, 34.0831162], [-118.2733249, 34.0829227], [-118.272977, 34.0826604], [-118.2727111, 34.0824718], [-118.2726804, 34.0824496], [-118.2725206, 34.0823344], [-118.2722665, 34.0821511], [-118.2720153, 34.0819699], [-118.2718532, 34.0818577], [-118.2715732, 34.0816579], [-118.2712815, 34.0814497], [-118.2710666, 34.0812329], [-118.2706569, 34.0808196], [-118.2703708, 34.0805311], [-118.2701053, 34.0802461], [-118.2700145, 34.080162], [-118.2697721, 34.0799446], [-118.2695395, 34.0797949], [-118.2693788, 34.0797111], [-118.2692874, 34.079658], [-118.2689999, 34.0795104], [-118.2686002, 34.0793177], [-118.2669565, 34.0785252], [-118.266727, 34.0784069], [-118.2665016, 34.0782906], [-118.2663366, 34.0781852], [-118.265963, 34.0778233], [-118.265815, 34.0776935], [-118.2656962, 34.0776102], [-118.2655321, 34.0775119], [-118.2654645, 34.0774848], [-118.2653171, 34.0774446], [-118.2651369, 34.0774162], [-118.2649727, 34.0773991], [-118.2648199, 34.0773957], [-118.2646725, 34.0774122], [-118.2644304, 34.0774476], [-118.263457, 34.0776145], [-118.2629315, 34.0777008], [-118.2621157, 34.0778348], [-118.2617578, 34.0778936], [-118.26169, 34.0779046], [-118.2611312, 34.0780069], [-118.2609067, 34.0780479], [-118.2607962, 34.0780602], [-118.2606862, 34.0780695], [-118.2605724, 34.0780741], [-118.2604566, 34.0780617], [-118.2603353, 34.0780389], [-118.2602101, 34.0780005], [-118.2598435, 34.0778419], [-118.259674, 34.0777686], [-118.2593746, 34.077639], [-118.2590875, 34.0775151], [-118.2589229, 34.0774441], [-118.2584092, 34.0772223], [-118.2580257, 34.0770557], [-118.257846, 34.0769763], [-118.2573462, 34.0767579], [-118.2567958, 34.0765193], [-118.2566163, 34.0764415], [-118.2564332, 34.0763621], [-118.2562222, 34.0762706], [-118.2558711, 34.0761157], [-118.2555758, 34.0759895], [-118.2554184, 34.0759222], [-118.2552571, 34.0758492], [-118.2547154, 34.0756141], [-118.2543592, 34.0754595], [-118.2542817, 34.0754257], [-118.2537829, 34.0752082], [-118.2534585, 34.0750667], [-118.2529489, 34.0748397], [-118.252896, 34.0748162], [-118.2528221, 34.0747833], [-118.2527298, 34.0747419], [-118.2525682, 34.0746702], [-118.2524711, 34.0746101], [-118.2522516, 34.0744404], [-118.2520739, 34.0743031], [-118.251971, 34.0741928], [-118.2519189, 34.0741078], [-118.251837, 34.0739945], [-118.2517744, 34.0738984], [-118.2517638, 34.0738821], [-118.2517132, 34.0737937], [-118.251701, 34.0737688], [-118.2516437, 34.0736508], [-118.2515884, 34.0735282], [-118.2515188, 34.0733597], [-118.251465, 34.0732356], [-118.2513644, 34.073054], [-118.2512142, 34.0728092], [-118.251157, 34.0727191], [-118.2511196, 34.0726649], [-118.2510176, 34.0724995], [-118.2507946, 34.0721154], [-118.2507343, 34.0719964], [-118.2506921, 34.0718943], [-118.250685, 34.0718691], [-118.2506609, 34.0717793], [-118.2506586, 34.0717705], [-118.2506425, 34.0716722], [-118.2506405, 34.0716569], [-118.2506188, 34.071501], [-118.2506018, 34.0713696], [-118.2505967, 34.071332], [-118.25055, 34.0710003], [-118.2505137, 34.0707329], [-118.2505023, 34.0706098], [-118.2504966, 34.0704897], [-118.2504936, 34.070351], [-118.2504877, 34.0700818], [-118.2504756, 34.0695264], [-118.2504714, 34.0693985], [-118.2504609, 34.0692799], [-118.2504425, 34.0691674], [-118.2503501, 34.0687303], [-118.2503293, 34.0686321], [-118.2503028, 34.0685012], [-118.2502732, 34.0683987], [-118.2502023, 34.0681818], [-118.250115, 34.0679312], [-118.2500705, 34.0678063], [-118.2500085, 34.0676184], [-118.2499506, 34.0674338], [-118.2498775, 34.0671926], [-118.2497795, 34.066869], [-118.2497435, 34.0667501], [-118.2494586, 34.0658135], [-118.2494512, 34.0657891], [-118.2493942, 34.0655998], [-118.2493687, 34.0655181], [-118.2493204, 34.0653808], [-118.249278, 34.0652866], [-118.2492331, 34.0652072], [-118.2491775, 34.0651299], [-118.2491111, 34.0650433], [-118.2490415, 34.0649683], [-118.2489613, 34.0648898], [-118.2488892, 34.0648257], [-118.2488687, 34.0648085], [-118.2487928, 34.0647448], [-118.2484348, 34.0644445], [-118.2480327, 34.0641075], [-118.2472574, 34.0634547], [-118.2470798, 34.0633074], [-118.2468654, 34.0631296], [-118.2462968, 34.0626773], [-118.2458008, 34.0622472], [-118.2446486, 34.0612482], [-118.2446109, 34.0612163], [-118.2442752, 34.0609437], [-118.2442115, 34.060892], [-118.2438652, 34.0606108], [-118.2437167, 34.0605017], [-118.2435961, 34.0604274], [-118.2435134, 34.0603765], [-118.2432389, 34.0602097], [-118.2431933, 34.060182], [-118.2429225, 34.0600288], [-118.2427668, 34.0599406], [-118.2426193, 34.0598583], [-118.2423078, 34.0596909], [-118.2414335, 34.0592211], [-118.240883, 34.0589065], [-118.2407586, 34.0588354], [-118.2404725, 34.0586719], [-118.2403528, 34.0586074], [-118.2402193, 34.0585385], [-118.2401207, 34.0584891], [-118.2400829, 34.0584702], [-118.2399669, 34.0584191], [-118.2398356, 34.0583738], [-118.2396784, 34.0583195], [-118.2395068, 34.0582842], [-118.2393537, 34.0582554], [-118.2391795, 34.0582356], [-118.2389703, 34.0582291], [-118.238699, 34.0582344], [-118.2381602, 34.058253], [-118.2379941, 34.0582557], [-118.2378598, 34.0582531], [-118.2377443, 34.0582467], [-118.2376474, 34.0582314], [-118.2375964, 34.0582199], [-118.2373202, 34.0581578], [-118.2370702, 34.0580858], [-118.2366618, 34.0579691], [-118.2359668, 34.0577704], [-118.2347673, 34.0574276], [-118.2331853, 34.056974] ]

# takes a table_id and retrieves the data from baserow; it's recursive as the baserow api only returns a max of 100 results
def get_table(table_id, page=1):
    time.sleep(0.05)
    url = f'https://api.baserow.io/api/database/rows/table/{table_id}/?user_field_names=true&page={page}'
    if (page == 1):
        print("requesting page ", end='')
    print(f"{page} ... ", end='')
    req = Request(url)
    req.add_header('Authorization', f'Token {api_key}')
    content = urlopen(req).read()
    response_json = json.loads(content)
    results = response_json["results"]
    if response_json["count"] > page * 100:
        results = results + get_table(table_id, page + 1)
    else:
        print("")  # newline
    return results

def isfloat(num):
    try:
        float(num)
        return True
    except ValueError:
        return False

# takes two points and a percentage of the distance between them and returns the midpoint
# used to calculate an address point if it falls between two of the street points
def midPoint(point1, point2, per):
    return [point1[0] + (point2[0] - point1[0]) * per, point1[1] + (point2[1] - point1[1]) * per];

# calculates the rotation of the marker so it faces perpendicularly away from the street
def calcRotation(point):
  idx = coordinates.index(point)
  return math.atan2(coordinates[min(len(coordinates) - 1, idx + 1)][0] - coordinates[max(0, idx - 1)][0], coordinates[min(len(coordinates) - 1, idx + 1)][1] - coordinates[max(0, idx - 1)][1]) * 180 / math.pi;


# retrieve the strip labels data, filtering out any rows with no coordinate
strip_labels = list(filter(lambda x: x['coordinate'] != None and isfloat(x['coordinate']), get_table(103061)))

# get the max coordinate and the total distance of the path
max_coordinate = max(map(lambda d: float(d['coordinate']), filter(lambda d: d['coordinate'] != None, strip_labels)))
totalDistance = 0;
for idx, point in enumerate(coordinates):
  if (idx < len(coordinates) - 1):
    totalDistance = totalDistance + math.dist(point, coordinates[idx + 1]);
pointsDistanceAlongPath = [];
runningDistance = 0;
for idx, point in enumerate(coordinates):
  if idx == len(coordinates) - 1:
    runningDistance = totalDistance
  elif idx != 0: 
    runningDistance += math.dist(point, coordinates[idx + 1])
  pointsDistanceAlongPath.append({
    "point": point,
    "runningDistance": runningDistance,
    "percent": runningDistance / totalDistance,
    "rotation": calcRotation(point),
  })
pointsDistanceAlongPath.sort(key=lambda x: x['percent'])

# takes a coordinate and calculates lat/lng coordinate based on its distance along the Sunset path
def coordinateToPoint(coordinate):
  # find the point it's on or points it's between
  percentAlongPath = coordinate / max_coordinate
  pointsBelow = list(filter(lambda x: x['percent'] <= percentAlongPath, pointsDistanceAlongPath))
  pointsAbove = list(filter(lambda x: x['percent'] >= percentAlongPath, pointsDistanceAlongPath))
  pointBelow = pointsBelow[-1] if pointsBelow else None
  pointAbove = pointsAbove[0] if pointsAbove else None
  # figure out how close the coordinate is to each of the points
  return midPoint(pointBelow["point"], pointAbove["point"], (percentAlongPath - pointBelow["percent"]) * (pointAbove["percent"] - pointBelow["percent"]));

# takes a coordinate and calculates it's rotation based on the rotation of the points below and above it
def coordinateRotation(coordinate):
  # find the point it's on or points it's between
  percentAlongPath = coordinate / max_coordinate
  pointsBelow = list(filter(lambda x: x['percent'] <= percentAlongPath, pointsDistanceAlongPath))
  pointsAbove = list(filter(lambda x: x['percent'] >= percentAlongPath, pointsDistanceAlongPath))
  pointBelow = pointsBelow[-1] if pointsBelow else None
  pointAbove = pointsAbove[0] if pointsAbove else None

  # figure out how close the coordinate is to each of the points
  return pointBelow["rotation"] + (pointAbove["rotation"] - pointBelow["rotation"]) * (percentAlongPath - pointBelow["percent"]) * (pointAbove["percent"] - pointBelow["percent"])

# takes a strip label and adds lat, lng, and rotation data
def labelWithLatLngs(label):
  coordinate = float(label['coordinate'])
  latLng = coordinateToPoint(coordinate)
  return {
    "l": int(label['label']) if label['label'].isnumeric() else label['label'],
    "c": coordinate,
    "s": label['street_side'],
    "h": not label['label_hidden'],
    "lat": latLng[1],
    "lng": latLng[0],
    "r": coordinateRotation(coordinate)
  }

#map the strip labels adding lat/lng and rotation data and write the json file
stripLabelsWithLatLngs = list(map(labelWithLatLngs, strip_labels))
with open("./src/assets/data/strip_labels.json", "w") as f:
    json.dump(stripLabelsWithLatLngs, f)

#retrieve the photo data for each year
print("getting photos...")
photographs = {
    '1966': get_table(24448),
    "1973": get_table(24445),
    "1985": get_table(24446),
    "1995": get_table(24447),
    "2007": get_table(24449)
}

def is_n(item):
    return item["street_side"] == 'n'

def is_s(item):
    return item["street_side"] == 's'

# write the photographs json files, separate files for n and s addresses
for year, value in photographs.items():
    n_values_iteratator = filter(is_n, value)
    n_values = list(n_values_iteratator)
    with open(f"./public/data/photographs_{year}_n.json", "w") as f:
        json.dump(n_values, f)
    s_values_iteratator = filter(is_s, value)
    s_values = list(s_values_iteratator)
    with open(f"./public/data/photographs_{year}_s.json", "w") as f:
        json.dump(s_values, f)
import { Link } from 'react-router-dom';

// Facts checked November 2026 against the sources listed at the end of the post.
// Review before each update: BPS lists and steel standards change.

export default function ImportingSteelCebu() {
  return (
    <>
      <p className="post-lead">
        Steel is one of the most common cargoes I clear at the Port of Cebu, and one of the
        easiest to get wrong. Rebar, H-beams and a prefabricated warehouse can arrive on the
        same vessel, yet customs and the Department of Trade and Industry (DTI) treat each one
        differently. Here is what to sort out before your steel ships, so it doesn&rsquo;t sit
        at the port collecting storage and demurrage charges.
      </p>

      <h2>1. First, know which kind of steel you&rsquo;re importing</h2>
      <p>
        The rules depend less on &ldquo;steel&rdquo; in general and more on the exact product.
        For customs purposes, most shipments fall into one of three groups.
      </p>

      <h3>Raw and long products under mandatory certification</h3>
      <p>
        The DTI&rsquo;s Bureau of Philippine Standards (BPS) keeps a list of products that must
        carry the Philippine Standard (PS) mark before they can be sold. For steel, the list
        currently includes:
      </p>
      <ul>
        <li>Deformed steel bars (rebar) and rerolled steel bars</li>
        <li>Equal-leg steel angle bars</li>
        <li>Black and galvanized (BI/GI) steel pipes, and lightweight welded steel tubes</li>
        <li>Low carbon steel wires and steel wire nails</li>
        <li>Hot-dip metallic-coated and pre-painted galvanized steel coils and sheets for roofing</li>
      </ul>
      <p>
        If your product is on this list, certification comes first. Everything else in this
        article depends on it.
      </p>

      <h3>Structural sections: H-beams, I-beams, channels and plates</h3>
      <p>
        H-beams and other heavy structural sections are not on the BPS mandatory list as of
        this writing, so they don&rsquo;t need a PS licence to clear. They still go through a
        regular formal entry, and two things matter most: the correct tariff classification
        (non-alloy vs. alloy steel, hot-rolled vs. further worked, the section height) and a
        packing list that matches what is actually in the container, bundle by bundle.
      </p>

      <h3>Prefabricated steel buildings</h3>
      <p>
        A complete prefab warehouse or building shipped in parts is usually declared as one
        prefabricated building, not as separate beams, purlins and panels. That only works if
        the shipment is presented as a complete unit: the bill of materials, drawings and
        packing list must tie every bundle to the building. When parts are split across
        several shipments or mixed with other cargo, customs may classify each item separately,
        often at different duty rates. Plan the shipment around this before it leaves the
        factory.
      </p>

      <h2>2. BPS certification: the PS licence and the Statement of Confirmation</h2>
      <p>
        For certified steel products, the foreign mill must hold a valid PS licence from BPS
        that covers the exact product, size and grade you are buying. Steel does not use the
        Import Commodity Clearance (ICC) route that applies to many other regulated products.
        Instead, the importer secures a <strong>Statement of Confirmation (SOC)</strong> from
        BPS for each shipment, each bill of lading and each product.
      </p>
      <p>Before you pay your supplier, ask for:</p>
      <ul>
        <li>A copy of their current PS licence, and check that your sizes and grades are covered</li>
        <li>Confirmation that every bar, bundle or sheet will carry the PS mark and the mill&rsquo;s markings</li>
        <li>Mill test certificates with heat numbers that match the bundle tags</li>
      </ul>
      <p>
        Steel without a valid licence or SOC can be held at the port, refused release or
        seized. DTI also runs regular market checks; in October 2025 it confiscated
        uncertified steel and plywood from retailers that lacked the PS and ICC marks.
      </p>

      <h2>3. Documents checklist</h2>
      <ul>
        <li>Bill of lading</li>
        <li>Commercial invoice with unit prices, total value and Incoterms</li>
        <li>Detailed packing list: sizes, grades, pieces and weight per bundle</li>
        <li>Mill test certificates with heat numbers</li>
        <li>Certificate of origin, if you want a free trade agreement rate (for example under ATIGA or RCEP)</li>
        <li>PS licence copy and BPS Statement of Confirmation, for certified products</li>
        <li>For prefab buildings: bill of materials, layout drawings and assembly manual</li>
        <li>Your valid BOC importer accreditation</li>
      </ul>

      <h2>4. Duties and taxes</h2>
      <p>
        The import duty depends on the tariff code and the country of origin, so getting the
        classification right is where most of the savings, and most of the risk, sit.
        A valid certificate of origin can lower or remove the duty under a free trade
        agreement. On top of duty, 12% VAT is charged on the landed cost, which includes the
        customs value, duty and other charges. Ask for a duty and tax estimate before you
        confirm the order, not after the vessel arrives.
      </p>

      <h2>5. Common reasons steel gets delayed</h2>
      <ul>
        <li><strong>Weight discrepancies</strong> between the invoice, packing list and actual cargo.</li>
        <li><strong>Missing or mismatched heat numbers</strong> on bundles vs. the mill certificates.</li>
        <li><strong>Classification questions</strong>, especially alloy vs. non-alloy steel, which customs examines closely.</li>
        <li><strong>A PS licence that doesn&rsquo;t cover the size or grade</strong> actually shipped.</li>
        <li><strong>Prefab parts split across shipments</strong> without paperwork linking them.</li>
        <li><strong>Physical examination.</strong> Heavy steel cargo is often selected for inspection, so plan time for it.</li>
      </ul>

      <h2>6. Watch out: the rebar standard is changing</h2>
      <p>
        An updated standard for deformed steel bars, PNS 49:2026, would stop Grade 33 rebar
        (the lowest, non-seismic grade) from being used for structural work. As reported in
        July 2026, the DTI&rsquo;s draft circular proposed a nine-month transition to mandatory
        compliance, through April 30, 2027, while the steel industry pushed for faster
        implementation. If you import rebar, check the current status and the grades you order
        before you sign a long-term supply contract.
      </p>

      <h2>Before you order: quick checklist</h2>
      <ol>
        <li>Confirm whether your product is on the BPS mandatory list.</li>
        <li>Get your supplier&rsquo;s PS licence and check that it covers your sizes and grades.</li>
        <li>Agree on the HS code and get a duty and tax estimate.</li>
        <li>Ask for a certificate of origin if an FTA rate applies.</li>
        <li>For prefab buildings, ship as a complete unit with a full bill of materials.</li>
        <li>Send me the documents before the vessel sails so problems are fixed early.</li>
      </ol>

      <div className="post-cta">
        <h2>Bringing steel through Cebu?</h2>
        <p>
          Send me your product list, supplier documents and arrival date. I&rsquo;ll check the
          certification, classification and duties, and reply with the requirements and a quote.
        </p>
        <div className="post-cta-buttons">
          <Link to="/rfq" className="post-btn-primary">Request a Quote</Link>
          <Link to="/contact" className="post-btn-secondary">Contact Me</Link>
        </div>
      </div>

      <div className="post-sources">
        <h2>Sources</h2>
        <ul>
          <li><a href="https://bps.dti.gov.ph/product-certification/list-of-products-under-mandatory-certification" target="_blank" rel="noopener noreferrer">DTI-BPS: List of products under mandatory certification</a></li>
          <li><a href="https://lic-public.wto.org/en/product-categories/678/procedure" target="_blank" rel="noopener noreferrer">WTO Import Licensing: Philippines ICC procedure (steel under the PS scheme and Statement of Confirmation), March 2026</a></li>
          <li><a href="https://bps.dti.gov.ph/press-releases/28-2021/272-dti-regulates-galvanized-steel-coils-and-sheets-for-consumer-protection-and-level-playing-field-for-the-steel-industry" target="_blank" rel="noopener noreferrer">DTI-BPS: Mandatory certification of galvanized steel coils and sheets (DAO 20-10)</a></li>
          <li><a href="https://thephilbiznews.com/2025/10/08/dti-cracks-down-on-substandard-construction-materials-worth-%E2%82%B12m/" target="_blank" rel="noopener noreferrer">The Philippine Business and News: DTI cracks down on substandard construction materials (October 2025)</a></li>
          <li><a href="https://www.philstar.com/business/2026/07/27/2544866/faster-transition-stricter-steel-rebar-standards-urged" target="_blank" rel="noopener noreferrer">Philstar: Faster transition to stricter steel rebar standards urged (July 2026)</a></li>
        </ul>
        <p className="post-disclaimer">
          This article is general information, not legal advice. Rules change; contact me to
          confirm the requirements for your specific shipment.
        </p>
      </div>
    </>
  );
}

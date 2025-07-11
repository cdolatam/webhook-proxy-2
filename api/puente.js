export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests are allowed.');
  }

  const body = req.body;

  // Validar grupo exacto
  if (
    !body.group ||
    body.group.name !== 'Aceptados Presencial Congreso 2025'
  ) {
    return res.status(200).send('Evento ignorado: tipo o grupo no válido.');
  }

  const fields = body.subscriber?.fields || {};

  const mappedData = {
    "ID": body.subscriber?.id || '',
    "CompanySize": fields.tamano_de_empresa || '',
    "BusinessSector": fields.rubro_de_empresa || '',
    "AnotherPosition": fields.position_add || '',
    "Position": fields.position || '',
    "Phone": fields.phone || '',
    "OtherBusinessSector": fields.otro_rubro || '',
    "Name": fields.name || '',
    "LinkedIn": fields.linkedin || '',
    "LastName": fields.last_name || '',
    "IdentifyDocument": fields.identify_document || '',
    "Country": fields.country || '',
    "ConsentimientoParaCompartirDatos": fields.consentimiento_para_compartir_datos || '',
    "Company": fields.company || '',
    "¿EresAsociadodeCDOLATAM?": fields.asociado_cdo_latam || '',
    "Email": body.subscriber?.email || ''
  };

  try {
    const response = await fetch(
      'https://defaulte69929079be64dcba9310bbf893f6e.22.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/11879dc7dc654229a16d7310225fa4d7/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-e6992907-9be6-4dcb-a931-0bbf893f6e22&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=nTlEHf27BJDRZ6VRmCt7jNwvdu2SD1gM--VweF0e7Xk',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mappedData),
      }
    );

    const result = await response.text();
    res.status(200).send(`Webhook forwarded:\n${result}`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Failed to forward to Power Automate');
  }
}

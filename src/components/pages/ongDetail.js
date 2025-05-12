import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOngs } from "../../context/OngsContext";
import styled from "styled-components";
import { QRCodeSVG } from "qrcode.react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Container = styled.div`
  max-width: 900px;
  margin: 24px auto;
  padding: 0 16px;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 32px;
`;

const ImgBox = styled.div`
  background: #e9eafe;
  border-radius: 12px;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ONGImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ONGName = styled.h2`
  color: #3b82f6;
  font-size: 1.2rem;
  margin: 0 0 8px 0;
`;

const ONGDesc = styled.p`
  color: #222;
  font-size: 0.95rem;
  margin-bottom: 12px;
`;

const SectionTitle = styled.div`
  font-weight: bold;
  margin: 18px 0 6px 0;
`;

const Needs = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: #222;
  font-size: 0.95rem;
`;

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 32px;
  margin-top: 18px;
`;

const MapBox = styled.div`
  margin-bottom: 8px;
`;

const AddressTitle = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 2px;
`;

const AddressText = styled.div`
  font-size: 0.95rem;
  color: #222;
  margin-bottom: 8px;
`;

const PixBox = styled.div`
  color: #222;
`;

const PixTitle = styled.div`
  color: #22a06b;
  font-weight: bold;
  font-size: 1.05rem;
  margin-bottom: 6px;
`;

const PixEmail = styled.div`
  font-size: 0.95rem;
  margin-bottom: 4px;
`;

const PixKey = styled.div`
  font-size: 0.95rem;
  margin-bottom: 8px;
`;

const QRBox = styled.div`
  margin-top: 8px;
`;

const OngDetail = () => {
  const { id } = useParams();
  const { ongs } = useOngs();
  const [ong, setOng] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ongFromContext = ongs.find((o) => o.id === id);
    if (ongFromContext) {
      setOng(ongFromContext);
      setLoading(false);
    } else {
      const fetchOng = async () => {
        try {
          const docRef = doc(db, "ongs", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setOng({ id: docSnap.id, ...docSnap.data() });
          }
        } catch (e) {
          setOng(null);
        } finally {
          setLoading(false);
        }
      };
      fetchOng();
    }
  }, [id, ongs]);

  if (loading) return <div>Carregando...</div>;
  if (!ong) return <div>ONG não encontrada</div>;

  return (
    <Container>
      <MainGrid>
        <div>
          <ImgBox>
            {ong.imagemUrl ? <ONGImg src={ong.imagemUrl} alt={ong.nome} /> : null}
          </ImgBox>
          <BottomGrid>
            <div>
              <AddressTitle>Localização:</AddressTitle>
              <AddressText>
                {ong.endereco
                  ? `${ong.endereco.rua || "Rua não informada"}, ${ong.endereco.numero || "Número não informado"} - ${ong.endereco.bairro || "Bairro não informado"}, ${ong.endereco.cidade || "Cidade não informada"} - ${ong.endereco.estado || "Estado não informado"}`
                  : "Endereço não informado"}
              </AddressText>
              {ong.endereco && (
                <MapBox>
                  <iframe
                    title="mapa"
                    width="100%"
                    height="120"
                    style={{ border: 0, borderRadius: 8 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      `${ong.endereco.rua}, ${ong.endereco.cidade}, ${ong.endereco.estado}`
                    )}&output=embed`}
                  />
                </MapBox>
              )}
            </div>
            <PixBox>
              <PixTitle>Vai doar via PIX?</PixTitle>
              <PixEmail>
                Aqui está nossa chave PIX:<br />
                E-mail: <b>{ong.email || "email não informado"}</b>
              </PixEmail>
              <PixKey>
                {ong.pixKey ? (
                  <>
                    Chave: <b>{ong.pixKey}</b>
                  </>
                ) : (
                  "Chave PIX não informada"
                )}
              </PixKey>
              {ong.pixKey && (
                <>
                  Ou temos aqui o QR Code:<br />
                  <QRBox>
                    <QRCodeSVG value={ong.pixKey} size={80} />
                  </QRBox>
                </>
              )}
            </PixBox>
          </BottomGrid>
        </div>
        <RightCol>
          <ONGName>{ong.nome}</ONGName>
          <ONGDesc>{ong.descricao}</ONGDesc>
          <SectionTitle>O que precisamos:</SectionTitle>
          <Needs>
            {ong.donationNeeds && ong.donationNeeds.length > 0 ? (
              ong.donationNeeds.map((need, idx) => (
                <li key={idx}>{need.title}</li>
              ))
            ) : (
              <li>Nenhuma necessidade de doação registrada no momento.</li>
            )}
          </Needs>
        </RightCol>
      </MainGrid>
    </Container>
  );
};

export default OngDetail;

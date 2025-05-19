import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOngs } from "../../context/OngsContext";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { db, auth, registerPixDonation } from "../../firebase/config";
import Modal from "react-modal";
import { FiPhone, FiMapPin, FiInfo, FiGift, FiLogIn } from "react-icons/fi";

const Container = styled.div`
  max-width: 900px;
  margin: 24px auto;
  padding: 0 16px;
  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const MainGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const TopGrid = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  width: 100%;
  justify-content: center;
  @media (max-width: 800px) {
    gap: 18px;
    align-items: stretch;
  }
`;

const ImgBox = styled.div`
  border-radius: 12px;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    width: 180px;
    height: 180px;
  }
`;

const ONGImg = styled.img`
  width: 300px;
  height: 300px;
  @media (max-width: 600px) {
    width: 180px;
    height: 180px;
  }
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ModalContent = styled.div`
  text-align: center;
  padding: 20px;
`;

const ModalHeader = styled.h3`
  color: #1a365d;
  font-weight: 500;
  margin: 0 0 25px 0;
  font-size: 1.3rem;
`;

const CleanInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 25px;
  color: #4a5568;

  &:focus {
    outline: none;
    border-color: #a0aec0;
  }
`;

const SimpleQRBox = styled.div`
  margin: 25px 0;
  padding: 15px;
  background: #f8fafc;
  border-radius: 8px;
`;

const MinimalButton = styled.button`
  width: 100%;
  padding: 14px;
  background: ${(props) => (props.primary ? "#1a365d" : "#fff")};
  color: ${(props) => (props.primary ? "#fff" : "#4a5568")};
  border: ${(props) => (props.primary ? "none" : "1px solid #e2e8f0")};
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: ${(props) => (props.primary ? "#2d3748" : "#f8fafc")};
  }
`;

const SubtleError = styled.div`
  color: #c53030;
  font-size: 0.9rem;
  margin: 15px 0;
  padding: 12px;
  background: #fff5f5;
  border-radius: 6px;
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

const ContactInfo = styled.div`
  font-size: 0.97rem;
  color: #1a365d;
    margin-top: 10px;

  margin-bottom: 10px;
  display: flex;
  align-items: center;

  justify-content: center;
  gap: 7px;
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
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const MapBox = styled.div`
  margin-bottom: 8px;
  width: 500px;
  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
  }
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

const PixKey = styled.div`
  font-size: 0.95rem;
  margin-bottom: 8px;
`;

const LoginPixButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  background:rgb(255, 255, 255);
  color:rgb(58, 134, 68);
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.95rem;
  cursor: pointer;
  margin-left: 8px;
  transition: background 0.15s;
  &:hover {
    background: #e2e8f0;
  }
`;

const OngDetail = () => {
  const { id } = useParams();
  const { ongs } = useOngs();
  const [ong, setOng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [donationValue, setDonationValue] = useState(10);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoadingDonation, setIsLoadingDonation] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
          // Apenas loga o erro, não faz setOng(null) para evitar problemas de renderização
          console.error(e);
        } finally {
          setLoading(false);
        }
      };
      fetchOng();
    }
  }, [id, ongs]);

  useEffect(() => {
    setUser(auth.currentUser);
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, [id, ongs]);

  const handleCloseModal = () => {
    setShowModal(false);
    setDonationValue(10);
    setIsSuccess(false);
    setErrorMsg("");
  };

  const handleDonation = async () => {
    setIsLoadingDonation(true);
    setErrorMsg("");
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Você precisa estar logado para doar.");
        setIsLoadingDonation(false);
        return;
      }
      const donationData = {
        ongId: ong.id,
        ongName: ong.nome,
        value: donationValue,
        pixKey: ong.pixKey,
        ongImage: ong.imagemUrl || null,
        status: "informada",
        enviadaEm: new Date(),
      };
      await registerPixDonation(user.uid, donationData);
      setIsSuccess(true);
    } catch (e) {
      console.error(e);
      setErrorMsg("Erro ao registrar doação. Tente novamente.");
    }
    setIsLoadingDonation(false);
  };

  if (loading) return <div>Carregando...</div>;
  if (!ong) return <div>ONG não encontrada</div>;

  return (
    <Container>
      <MainGrid>
        <TopGrid>
          <ImgBox>
            {ong.imagemUrl ? <ONGImg src={ong.imagemUrl} alt={ong.nome} /> : null}
          </ImgBox>
        </TopGrid>
        <TopGrid>
          <RightCol>
            <ONGName>{ong.nome}</ONGName>
            <ONGDesc>{ong.descricao}</ONGDesc>
            {ong.telefone && (
              <ContactInfo>
                <FiPhone style={{marginRight: 4}} />
                <b>Telefone:</b> {ong.telefone}
              </ContactInfo>
            )}
            <SectionTitle><FiInfo style={{marginRight: 4}} />O que precisamos:</SectionTitle>
            <Needs>
              {ong.necessidades ? (
                <h4>{ong.necessidades}</h4>
              ) : (
                <li>Nenhuma necessidade de doação registrada no momento.</li>
              )}
            </Needs>
          </RightCol>
        </TopGrid>
        <BottomGrid>
          <PixBox>
            <PixTitle><FiGift style={{marginRight: 4}} />Vai doar via PIX?</PixTitle>
            <PixKey>
              {user ? (
                ong.pixKey ? (
                  <>
                    Chave: <b>{ong.pixKey}</b>
                    <div style={{marginTop: 8, fontSize: '0.93rem', color: '#1a365d', background: '#f0fdf4', borderRadius: 6, padding: '8px 10px', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6}}>
                      <FiInfo style={{marginRight: 4}} />
                      <span>Se possível, coloque no motivo/descritivo do PIX: <b>Doação via HelpHand</b></span>
                    </div>
                  </>
                ) : (
                  "Chave PIX não informada"
                )
              ) : (
                <>
                  <span style={{color: '#c53030'}}>Faça login para visualizar a chave PIX</span>
                  <LoginPixButton onClick={() => navigate('/login')} title="Ir para login">
                    <FiLogIn /> Fazer login
                  </LoginPixButton>
                </>
              )}
            </PixKey>
          </PixBox>
          <div>
            <AddressTitle><FiMapPin style={{marginRight: 4}} />Localização:</AddressTitle>
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
                  height="300"
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
          
        </BottomGrid>
      </MainGrid>
      {/* Modal de doação PIX */}
    <Modal
  isOpen={showModal}
  onRequestClose={handleCloseModal}
  ariaHideApp={false}
  style={{
    overlay: { 
      backgroundColor: "rgba(255,255,255,0.9)",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: { 
      position: 'relative',
      maxWidth: '400px',
      width: '90%',
      borderRadius: '10px',
      padding: '0',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      background: '#fff'
    }
  }}
>
  {isSuccess ? (
    <ModalContent>
      <div style={{margin: '30px 0'}}>
        <div style={{fontSize: '2.5rem', marginBottom: '15px'}}>✓</div>
        <ModalHeader>Doação confirmada</ModalHeader>
        <MinimalButton onClick={handleCloseModal}>Fechar</MinimalButton>
      </div>
    </ModalContent>
  ) : (
    <ModalContent>
      <ModalHeader>Doar para {ong.nome}</ModalHeader>
      
      <div>
        <CleanInput
          type="number"
          min="1"
          value={donationValue}
          onChange={e => setDonationValue(Number(e.target.value))}
          placeholder="Valor (R$)"
        />
      </div>

      <SimpleQRBox>
        <div style={{marginTop: '15px', fontSize: '0.85rem', color: '#718096'}}>
          {ong.pixKey}
        </div>
      </SimpleQRBox>

      {errorMsg && <SubtleError>{errorMsg}</SubtleError>}

      <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
        <MinimalButton primary onClick={handleDonation} disabled={isLoadingDonation}>
          {isLoadingDonation ? 'Processando...' : 'Confirmar'}
        </MinimalButton>
        <MinimalButton onClick={handleCloseModal}>
          Cancelar
        </MinimalButton>
      </div>
    </ModalContent>
  )}
</Modal>
    </Container>
  );
};

export default OngDetail;

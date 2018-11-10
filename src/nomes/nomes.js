import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";

export default class Nomes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomePreferido: "Sim",
      usoNome: 1,
      condicional: 1
    };
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Nomes
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="nome"
              name="nome"
              label="Nome"
              fullWidth
              autoComplete="nome"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="sobrenome"
              name="sobrenome"
              label="Sobrenome"
              fullWidth
              autoComplete="sobrenome"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="titulo"
              name="titulo"
              label="Título"
              fullWidth
              autoComplete="titulo"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="sufixo"
              name="sufixo"
              label="Sufixo"
              fullWidth
              autoComplete="sufixo"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              variant="outlined"
              style={{
                minWidth: "100%"
              }}
            >
              <InputLabel htmlFor="nomePreferido">Nome Preferido</InputLabel>
              <Select
                value={this.state.nomePreferido}
                input={<Input name="nomePreferido" id="nomePreferido" />}
                displayEmpty
              >
                <MenuItem value={"Sim"}>Nome preferido</MenuItem>
                <MenuItem value={"Não"}>Esté não é o nome preferido</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              variant="outlined"
              style={{
                minWidth: "100%"
              }}
            >
              <InputLabel htmlFor="usoNome">Uso do Nome</InputLabel>
              <Select
                value={this.state.usoNome}
                input={<Input name="usoNome" id="usoNome" />}
                displayEmpty
              >
                <MenuItem value={1}>Relatório(R)</MenuItem>
                <MenuItem value={2}>Nome de recém-nascido(N)</MenuItem>
                <MenuItem value={3}>Nome profissional ou comercial(C)</MenuItem>
                <MenuItem value={4}>
                  Nome de solteiro, nome de nascimento ou nome
                  original(Original)
                </MenuItem>
                <MenuItem value={5}>Nome registrado (nome legal)</MenuItem>
                <MenuItem value={8}>Outro nome (alias)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              variant="outlined"
              style={{
                minWidth: "100%"
              }}
            >
              <InputLabel htmlFor="condicional">
                Indicador de uso condicional
              </InputLabel>
              <Select
                value={this.state.condicional}
                input={<Input name="condicional" id="condicional" />}
                displayEmpty
              >
                <MenuItem value={1}>Informação não confiável </MenuItem>
                <MenuItem value={2}>Nome com erro de digitação</MenuItem>
                <MenuItem value={3}>Nome para não ser usado</MenuItem>
                <MenuItem value={4}>Vínculo do nome proibido por lei</MenuItem>
                <MenuItem value={6}>
                  Requisito de privacidade/segurança especial
                </MenuItem>
                <MenuItem value={9}>Nome temporário</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

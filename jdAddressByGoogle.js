/**
 * Created by Desenvolvimento Web1 on 15/09/16.
 * Módulo responsável pelo tratamento de resultados de pesquisa de endereços
 * vindas do google
 *
 * ***************************************************************************
 * Desenvolver: Rony Silva
 * Email: ronysilvati@live.com
 * ***************************************************************************
 * ===========================================================================
 */

var jdAddressByGoogle   = function(){
    return{
        getAddressFormatted: function(rawAddress){
            var dataAddressByGoogle = {
                pais: null,
                cep: null,
                uf: null,
                ufShort: null,
                cidade: null,
                bairro: null,
                logradouro: null,
                numero: null,
                multipleNumbers:false,
                endereco_formatado: null,
                originalPosition: {
                    lat: null,
                    lng: null
                }
            };

            try{
                if(rawAddress){

                    try{
                        if(rawAddress){
                            if(('address_components' in rawAddress) && rawAddress.address_components.length && (rawAddress.address_components.length > 0)){
                                for(key in rawAddress.address_components){
                                    if(('types' in rawAddress.address_components[key]) && (rawAddress.address_components[key].types.length && (rawAddress.address_components[key].types.length > 0))){
                                        for(keyLocality in rawAddress.address_components[key].types){

                                            if('long_name' in rawAddress.address_components[key]){
                                                var stringAddress = rawAddress.address_components[key].long_name;
                                            }
                                            else{
                                                var stringAddress = null;
                                            }

                                            if('short_name' in rawAddress.address_components[key]){
                                                var stringAddressShort = rawAddress.address_components[key].short_name;
                                            }
                                            else{
                                                var stringAddressShort = null;
                                            }

                                            if(rawAddress.address_components[key].types[keyLocality] == 'route'){
                                                dataAddressByGoogle.logradouro  = stringAddress;
                                                continue;
                                            }
                                            else if(rawAddress.address_components[key].types[keyLocality] == 'postal_code'){
                                                dataAddressByGoogle.cep  = stringAddress.replace('-','');

                                                if(dataAddressByGoogle.cep.length !== 8){
                                                    dataAddressByGoogle.cep = null;
                                                }

                                                continue;
                                            }
                                            else if(rawAddress.address_components[key].types[keyLocality] == 'sublocality'){
                                                dataAddressByGoogle.bairro  = stringAddress;
                                                continue;
                                            }
                                            else if(rawAddress.address_components[key].types[keyLocality] == 'administrative_area_level_2'){
                                                dataAddressByGoogle.cidade  = stringAddress;
                                                continue;
                                            }
                                            else if(rawAddress.address_components[key].types[keyLocality] == 'administrative_area_level_1'){
                                                dataAddressByGoogle.uf          = stringAddress;
                                                dataAddressByGoogle.ufShort     = stringAddressShort;
                                                continue;
                                            }
                                            else if(rawAddress.address_components[key].types[keyLocality] == 'country'){
                                                dataAddressByGoogle.pais  = stringAddress;
                                                continue;
                                            }
                                            else if(rawAddress.address_components[key].types[keyLocality] == 'street_number'){
                                                if(stringAddress.indexOf('-') > -1){
                                                    stringAddress   = stringAddress.split('-');
                                                    var itens       = stringAddress.length;
                                                    var total       = 0;

                                                    // Caso o endereço retorne como numero mais de uma referencia
                                                    // então somo todos os numeros e divido pela quantidade de resul-
                                                    // tados
                                                    for(i in stringAddress){
                                                        if(stringAddress[i] > 0){
                                                            total += parseInt(stringAddress[i]);
                                                        }
                                                    }

                                                    if(stringAddress.length > 1){
                                                        dataAddressByGoogle.multipleNumbers = true;
                                                    }

                                                    stringAddress   = (total/itens).toFixed(0);
                                                }

                                                dataAddressByGoogle.numero  = stringAddress;
                                                continue;
                                            }
                                        }
                                    }
                                }
                            }

                            if('formatted_address' in rawAddress){
                                dataAddressByGoogle.endereco_formatado  = rawAddress.formatted_address;
                            }
                        }
                    }
                    catch(err){
                        console.log("ERRO: " + err.message);
                    }


                }
            }
            catch(err){
                console.log("ERRO:"+err.message);
            }


            return dataAddressByGoogle;
        },
        getAddressWithoutNumber: function(addressFormatted,number){
            try{
                var labelEndereco    = '';

                if(addressFormatted['logradouro'] !== null){
                    labelEndereco += addressFormatted['logradouro'];

                    if(number){
                        labelEndereco += ', ' + number;
                    }
                }

                if(addressFormatted['bairro'] !== null){
                    labelEndereco += ' - '+addressFormatted['bairro'];
                }

                if(addressFormatted['cidade'] !== null){
                    labelEndereco += ', '+addressFormatted['cidade'];

                    if(addressFormatted['uf'] !== null){
                        labelEndereco += ' - '+addressFormatted['uf'];
                    }
                }

                if(addressFormatted['pais'] !== null){
                    labelEndereco += ', '+addressFormatted['pais'];
                }

                return labelEndereco;
            }
            catch(err){
                console.log("ERRO: " + err.message);
            }

            return null;
        }
    }
}


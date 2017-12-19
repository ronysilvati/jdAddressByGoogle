<?php
//************************************************************************************************************//
//    JdAddressByGoogle -- Classe auxiliar para a manipulação de resultados de pesquisa de endereço do google //
//************************************************************************************************************//
##############################################################################
## Jetdata Sistemas, outubro de 2016
## Desenvolvedor: Rony Silva (ronysilvati@live.com)
##############################################################################
//////////////////////////////////////////////////////////////////////////////


class JdAddressByGoogle{

    public function __constructor(){

    }

    public function getAddressFormatted($rawAddress){
        if($rawAddress){
            $dataAddressByGoogle    = array(
                'pais'  => null,
                'cep'   => null,
                'uf'    => null,
                'ufShort'   => null,
                'cidade'    => null,
                'bairro'    => null,
                'logradouro'=> null,
                'numero'    => null,
                'multipleNumbers'   => false,
                'endereco_formatado'    => null
            );

            if(is_array($rawAddress)){
                if(array_key_exists('address_components',$rawAddress) && is_array($rawAddress['address_components']) && count($rawAddress['address_components']) > 0){
                    foreach($rawAddress['address_components'] as $addressComponent){
                        if(is_array($addressComponent) && array_key_exists('types',$addressComponent) && is_array($addressComponent['types']) && count($addressComponent['types']) > 0){
                            foreach($addressComponent['types'] as $type){

                                if(array_key_exists('long_name',$addressComponent)){
                                    $stringAddress  = $addressComponent['long_name'];
                                }
                                else{
                                    $stringAddress  = null;
                                }

                                if(array_key_exists('short_name',$addressComponent)){
                                    $stringAddressShort  = $addressComponent['short_name'];
                                }
                                else{
                                    $stringAddressShort  = null;
                                }

                                if($type === 'route'){
                                    $dataAddressByGoogle['logradouro']  = $stringAddress;
                                    continue;
                                }
                                else if($type === 'postal_code'){
                                    $stringAddress  = str_replace('-','',$stringAddress);

                                    if(strlen($stringAddress) === 8){
                                        $dataAddressByGoogle['cep']  = $stringAddress;

                                    }

                                    continue;

                                }
                                else if($type === 'sublocality'){
                                    $dataAddressByGoogle['bairro']  = $stringAddress;
                                    continue;
                                }
                                else if($type === 'administrative_area_level_2'){
                                    $dataAddressByGoogle['cidade']  = $stringAddress;
                                    continue;
                                }
                                else if($type === 'administrative_area_level_1'){
                                    $dataAddressByGoogle['uf']  = $stringAddress;
                                    $dataAddressByGoogle['ufShort'] = $stringAddressShort;
                                    continue;
                                }
                                else if($type === 'country'){
                                    $dataAddressByGoogle['pais']  = $stringAddress;
                                    continue;
                                }
                                else if($type === 'street_number'){

                                    if(strpos($stringAddress,'-') !== false){
                                        $stringAddress  = explode('-',$stringAddress);
                                        $itens  = count($stringAddress);
                                        $total = 0;

                                        // Caso o endereço retorne como numero mais de uma referencia
                                        // então somo todos os numeros e divido pela quantidade de resul-
                                        // tados

                                        foreach($stringAddress as $number){
                                            $total += $number;
                                        }

                                        if(count($stringAddress) > 1){
                                            $dataAddressByGoogle['multipleNumbers'] = true;
                                        }

                                        $stringAddress  = ceil(($total/$itens));

                                    }

                                    $dataAddressByGoogle['numero']  = $stringAddress;
                                    continue;
                                }
                            }
                        }
                    }

                    if(array_key_exists('formatted_address',$rawAddress)){
                        $dataAddressByGoogle['endereco_formatado']  = $rawAddress['formatted_address'];
                    }

                }
            }

            return $dataAddressByGoogle;
        }
    }


    public function getAddressWithoutNumber($addressFormatted,$number){
        $labelEndereco  = '';

        if(is_array($addressFormatted)){
            if(array_key_exists('logradouro',$addressFormatted)){
                $labelEndereco.= $addressFormatted['logradouro'];

                if($number){
                    $labelEndereco .= ', ' . $number;
                }
            }

            if(array_key_exists('bairro',$addressFormatted)){
                $labelEndereco .= ' - '.$addressFormatted['bairro'];
            }

            if(array_key_exists('cidade',$addressFormatted)){
                $labelEndereco .= ', '.$addressFormatted['cidade'];

                if(array_key_exists('uf',$addressFormatted) && !empty($addressFormatted['uf'])){
                    $labelEndereco .= ' - ' .$addressFormatted['uf'];
                }
            }

            if(array_key_exists('pais',$addressFormatted)){
                $labelEndereco .= ', '.$addressFormatted['pais'];
            }
        }

        return $labelEndereco;
    }

}
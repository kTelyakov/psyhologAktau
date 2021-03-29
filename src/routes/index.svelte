<svelte:head>
	<title>Психолог в Актау</title>
</svelte:head>

modal : { modal }
<button on:click={ () => modal = !modal }>Toggle</button>
<ModalYoutube show={modal} videoId="_bltb7YlBV8">
	asdasd
</ModalYoutube>

<!--<CtaSection></CtaSection>-->
<!--<ServicesSection></ServicesSection>-->
<!--<Separator></Separator>-->
<!--<BioSection></BioSection>-->
<!--<Separator></Separator>-->
<!--<TvSection></TvSection>-->
<!--<Separator></Separator>-->
<!--<Testimonials></Testimonials>-->
<!--<Separator></Separator>-->
<!--<FaqSection></FaqSection>-->
<!--<Separator></Separator>-->
<!--<PhotoReports></PhotoReports>-->
<!--<Separator></Separator>-->
<!--<Contacts></Contacts>-->

<script>

let modal
import ModalYoutube from '../components/ModalYoutube.svelte'
import CtaSection from '../components/sections/CtaSection.svelte'
import ServicesSection from '../components/sections/ServicesSection.svelte'
import Separator from '../components/Separator.svelte'
import BioSection from '../components/sections/BioSections.svelte'
import TvSection from '../components/sections/TvSection.svelte'
import Testimonials from '../components/sections/Testimonials.svelte'
import FaqSection from '../components/sections/FaqSection.svelte'
import PhotoReports from '../components/sections/PhotoReports.svelte'
import Contacts from '../components/sections/Contacts.svelte'

</script>


package br.ufc.books.author;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

public class AuthorControllerTest {

  @Mock
  private AuthorRepository repository;

  @InjectMocks
  private AuthorController controller;

  private MockMvc mvc;

  @Before
  public void setUp() throws Exception {
    MockitoAnnotations.initMocks(this);
    mvc = MockMvcBuilders
        .standaloneSetup(controller)
        .build();
  }

  @Test
  public void getAll() throws Exception {
    final List<Author> expected = Arrays.asList(
        new Author(1, "Glauco", "Aquino", "glauco.aquino@ifactory.com.br", null),
        new Author(2, "Felipe", "Pinheiro", "felipe.pinheiro@ifactory.com.br", null)
    );

    Mockito.when(repository.findAll()).thenReturn(expected);

    mvc.perform(get("/authors").accept(APPLICATION_JSON_UTF8_VALUE))
        .andExpect(status().is(200))
        .andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
        .andExpect(content().json(jsonString(expected)));
  }

  @Test
  @Ignore
  public void getById() throws Exception {

  }

  @Test
  public void testCreateAuthorWithSuccess() throws Exception {
    Author expected = new Author(
        1,
        "José",
        "de Alencar",
        "glauco.aquino@ifactory.com.br",
        null);

    mvc.perform(post("/authors")
        .content(jsonString(expected))
        .contentType("application/json"))
        .andExpect(status().is(201));
  }

  @Test
  public void testCreateAuthorWithConflict() throws Exception {
    Mockito.doThrow(new DataIntegrityViolationException(null))
        .when(repository).save(Mockito.any(Author.class));

    mvc.perform(post("/authors")
        .content("{}")
        .contentType("application/json"))
        .andExpect(status().is(409));
  }

  @Test
  @Ignore
  public void updateAuthor() throws Exception {
  }

  @Test
  @Ignore
  public void removeAuthor() throws Exception {
  }

  private static final HttpMessageConverter<Object> CONVERTER =
      new MappingJackson2HttpMessageConverter();

  private static String jsonString(Object o) throws IOException {
    final MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
    CONVERTER.write(o, APPLICATION_JSON_UTF8, mockHttpOutputMessage);
    return mockHttpOutputMessage.getBodyAsString();
  }

}
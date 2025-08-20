package com.core.entities;

import java.io.Serializable;
import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaveListId implements Serializable {

	private static final long serialVersionUID = 3L;

	private Long user;
	private Long property;

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof SaveListId))
			return false;
		SaveListId that = (SaveListId) o;
		return Objects.equals(user, that.user) && Objects.equals(property, that.property);
	}

	@Override
	public int hashCode() {
		return Objects.hash(user, property);
	}
}